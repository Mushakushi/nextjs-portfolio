import dynamic from "next/dynamic";
const PreBlock = dynamic(() => import("./PreBlock"), { ssr: false }); // occasionally getting incorrect (?) ssr errors

import InlineCodeBlock from "./InlineCodeBlock";
import { CodeBlockBaseProps } from "./types";
import { NavLink, ClientText, HeadingLink } from "components";
import { generateSlug } from "shared/parsing";

import parse, { DOMNode, Element, attributesToProps, domToReact } from "html-react-parser";
import { ProseClient } from "./Prose";
import Table from "./HTMLTable";

interface MarkdownProps {
    /** The HTML. */
    body: string;
}

/** Renders HTML. */
const HTMLParser = ({ body }: MarkdownProps) => {
    if (!body) return <></>;

    /** replaces a {@link DOMNode} with the appropriate element or `undefined` if the `node` is an instance of the domhandler's `Element`. */
    const replace = (node: DOMNode) => {
        if (node instanceof Element && node.attribs) {
            const props = attributesToProps(node.attribs) as any;
            switch (node.name as keyof HTMLElementTagNameMap) {
                case "pre":
                    return (
                        <PreBlock className={node.attribs.class as CodeBlockBaseProps["className"]} {...props}>
                            {domToReact(node.children) as React.ReactElement}
                        </PreBlock>
                    );
                case "code":
                    return <InlineCodeBlock {...props}>{domToReact(node.children)}</InlineCodeBlock>;
                case "h2":
                    const children = domToReact(node.children);
                    if (children === "\xa0" /** &nbsp */) return <></>;
                    return (
                        // @ts-ignore TODO - Argument of type ChildNode is not assignable to parameter of type ChildNode | Node | ParentNode
                        <HeadingLink slugSource={generateSlug(node.children[0])} text={children} {...props} />
                    );
                case "p":
                    return (
                        <ClientText as="div" fontSize="md" lineHeight={6} {...props}>
                            {domToReact(node.children, { replace: replace })}
                        </ClientText>
                    );
                case "sub":
                    return (
                        <ClientText as="sub" {...props}>
                            {domToReact(node.children)}
                        </ClientText>
                    );
                case "a":
                    return (
                        <NavLink {...props} variant="external">
                            {domToReact(node.children)}
                        </NavLink>
                    );
                case "blockquote":
                    return (
                        <ProseClient {...props}>
                            <blockquote>{domToReact(node.children)}</blockquote>
                        </ProseClient>
                    );
                case "table":
                    return <Table mb={6}>{domToReact(node.children) as JSX.Element[]}</Table>;
                case "figure":
                case "ol":
                case "ul":
                    return <ProseClient {...props}>{domToReact(node.children)}</ProseClient>;
                default:
                    return node;
            }
        }
    };

    return parse(body, { replace: replace });
};

export { HTMLParser as default };
