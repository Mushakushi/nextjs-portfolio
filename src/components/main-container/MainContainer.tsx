"use client";

import { Container, ContainerProps } from "@chakra-ui/react";

export default function MainContainer({ children, ...props }: ContainerProps) {
    return (
        <Container
            maxWidth={["xs", "md", "2xl", "3xl", "5xl"]}
            alignContent="center"
            height="100%"
            display="table"
            style={{ tableLayout: "fixed" }}
            padding={0}
            {...props}
        >
            {children}
        </Container>
    );
}
