import { StyleJsxGlobal, Providers } from "chakra";
import { Header, MainContainer, Footer } from "components";
import { HandleOnComplete } from "router";
import "css/giscus/giscus.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang="en"
            suppressHydrationWarning /** https://github.com/chakra-ui/chakra-ui/issues/7040#issuecomment-1655818781 */
            style={{
                height: "100%",
            }}
        >
            <body
                suppressHydrationWarning
                style={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100%",
                }}
            >
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <HandleOnComplete />
                <StyleJsxGlobal />
                <Providers>
                    <Header />
                    <MainContainer as="main" flex={1} marginTop={24}>
                        {children}
                    </MainContainer>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
