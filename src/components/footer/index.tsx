"use client";

import Link from "next/link";
import { Button, Center, Flex, Stack, Text } from "@chakra-ui/react";
import { IconButtonLink } from "components/link";
import { environment } from "environment";
import { GrDocumentText, GrLinkedin, GrGithub } from "react-icons/gr";
import { HiOutlineMail } from "react-icons/hi";
import { FaItchIo } from "react-icons/fa6";

export function Footer() {
    const iconProps = { size: "lg", fontSize: "18px", display: "contents" };
    return (
        <Center as="footer" mt={50} pb={46}>
            <Stack direction="column" spacing={4}>
                <Text>Made by Matthew Brown</Text>
                <Stack direction="row" justify="center" align="center" spacing={3}>
                    <IconButtonLink
                        href={`mailto:${environment.NEXT_PUBLIC_EMAIL}`}
                        icon={<HiOutlineMail />}
                        aria-label="Email"
                        {...iconProps}
                    />
                    <IconButtonLink
                        href={environment.NEXT_PUBLIC_LINKEDIN_URL}
                        icon={<GrLinkedin />}
                        aria-label="LinkedIn"
                        {...iconProps}
                    />
                    <IconButtonLink
                        href={environment.NEXT_PUBLIC_GITHUB_URL}
                        icon={<GrGithub />}
                        aria-label="GitHub"
                        {...iconProps}
                    />
                    <IconButtonLink
                        href={environment.NEXT_PUBLIC_ITCH_URL}
                        icon={<FaItchIo />}
                        aria-label="Itch.io"
                        {...iconProps}
                    />
                </Stack>
                <Link
                    href={`${environment.NEXT_PUBLIC_POCKETBASE_URL}/api/files/files/${environment.NEXT_PUBLIC_POCKETBASE_RESUME_FILE_ID}/${environment.NEXT_PUBLIC_POCKETBASE_RESUME_FILE_NAME}`}
                    passHref
                    target="_blank"
                >
                    <Flex justify="center" align="center">
                        <Button variant="outline" leftIcon={<GrDocumentText />}>
                            Open Resume
                        </Button>
                    </Flex>
                </Link>
            </Stack>
        </Center>
    );
}