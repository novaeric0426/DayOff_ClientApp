"use client";

import { DatePickerInput } from "@mantine/dates";
import { Select, Container, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";

const DayOffPage = () => {
    const form = useForm({
        initialValues: {
            date: "",
            dayOffValue: "",
            reason: "",
        },
    });
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = window.localStorage.getItem("token");
        console.log(storedToken);
        if (!storedToken) {
            console.log("Not Auth!");
        } else {
            console.log("Auth!");
            setToken(storedToken);
        }
    }, []);

    const postDayOff = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            !form.values.date ||
            !form.values.dayOffValue ||
            !form.values.reason
        ) {
            console.log("Please fill in all form fields");
            return;
        }
        try {
            const response = await fetch(
                "http://localhost:10000/dayoff/submit",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(form.values),
                }
            );
            if (response.ok) {
                console.log("DayOff Submit Success!");
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    return (
        <Container>
            <form onSubmit={postDayOff}>
                <h1>휴가 신청 페이지</h1>
                <DatePickerInput
                    label="날짜 선택"
                    placeholder="날짜를 골라주세요."
                    mx="auto"
                    maw={400}
                    radius="md"
                    {...form.getInputProps("date")}
                />
                <Select
                    maw={400}
                    mx="auto"
                    radius="md"
                    label="휴가 종류 선택"
                    placeholder="휴가 종류 선택"
                    {...form.getInputProps("dayOffValue")}
                    data={[
                        { value: "oneday", label: "전일(1일 소진)" },
                        { value: "halfday", label: "반차(0.5일 소진)" },
                    ]}
                />
                <TextInput
                    label="휴가 사유 입력"
                    maw={400}
                    mx="auto"
                    radius="md"
                    placeholder="사유를 입력해주세요."
                    {...form.getInputProps("reason")}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Container>
    );
};

export default DayOffPage;
