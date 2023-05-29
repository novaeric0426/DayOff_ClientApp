"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
    Badge,
    Table,
    Group,
    Text,
    Anchor,
    ScrollArea,
    useMantineTheme,
    Button,
    Modal,
    TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { isNotEmpty } from "@mantine/form";

interface UsersTableProps {
    data: {
        [key: string]: string;
    }[];
}

const jobColors: Record<string, string> = {
    developer: "blue",
    manager: "cyan",
    designer: "pink",
    unknown: "gray",
};

const UsersTable = ({ data }: UsersTableProps) => {
    const router = useRouter();

    const [opened, { open, close }] = useDisclosure(false);
    const [openedDelete, { open: openDelete, close: closeDelete }] = useDisclosure(false);
    const [newPassword, setNewPassword] = useState("");
    const [targetId, setTargetId] = useState("");

    const theme = useMantineTheme();

    const pwSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch(
                "http://localhost:10000/admin/changepw",
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization:
                            "Bearer " + window.localStorage.getItem("token"),
                    },
                    body: JSON.stringify({
                        newPassword: newPassword,
                        userId: targetId,
                    }),
                }
            );
            if (response.ok) {
                console.log("Password Submit Success!");
            } else {
                const err = await response.json();
                console.log(`Error Message:${err.message}`);
                console.log("Password Submit Failed!");
            }
        } catch (error: any) {
            console.log(error.message);
        }
        console.log("New password:", newPassword);
        close();
    };

    const deleteUser = async (e:any) => {
        e.preventDefault();
        try {
            const response = await fetch(
                "http://localhost:10000/admin/deleteuser",
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId: targetId,
                    }),
                }
            );
            if (response.ok) {
                console.log("User Delete Success!");
                router.refresh();
            } else {
                const err = await response.json();
                console.log(`Error Message:${err.message}`);
                console.log("User Delete Failed!");
            }
        } catch (error: any) {
            console.log(error.message);
        }
        closeDelete();
    };

    const rows = data.map((item) => (
        <tr key={item.name}>
            <td>
                <Group spacing="sm">
                    <Text fz="sm" fw={500}>
                        {item.name}
                    </Text>
                </Group>
            </td>

            <td>
                <Badge
                    color={jobColors.unknown}
                    variant={theme.colorScheme === "dark" ? "light" : "outline"}
                >
                    {item.role}
                </Badge>
            </td>
            <td>
                <Anchor component="button" size="sm">
                    {item.email}
                </Anchor>
            </td>
            <td>
                <Text fz="sm" c="dimmed">
                    <Button
                        onClick={() => {
                            open();
                            setTargetId(item._id);
                        }}
                    >
                        Edit Password
                    </Button>
                    <Button onClick={()=>{openDelete();setTargetId(item._id)}} color="red">
                        Delete Account
                    </Button>
                </Text>
            </td>
        </tr>
    ));

    return (
        <ScrollArea>
            <Modal opened={opened} onClose={close} title="Authentication">
                <div style={{ padding: "1rem" }}>
                    <TextInput
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.currentTarget.value)}
                        placeholder="Enter new password"
                        required
                        type="password"
                    />
                    <Button onClick={pwSubmit} style={{ marginTop: "1rem" }}>
                        Submit
                    </Button>
                </div>
            </Modal>
            <Modal opened={openedDelete} onClose={closeDelete} title="Authentication">
                <div style={{ padding: "1rem" }}>
                    <Text>Are you sure you want to delete this account?</Text>
                    <Button onClick={deleteUser} style={{ marginTop: "1rem" }}>
                        Delete
                    </Button>
                </div>
            </Modal>
            <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
                <thead>
                    <tr>
                        <th>Employee</th>
                        <th>Role</th>
                        <th>Email</th>
                        <th>Edit</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </ScrollArea>
    );
};

export default UsersTable;
