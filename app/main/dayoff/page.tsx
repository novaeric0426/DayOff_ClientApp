"use client";

import { useState } from "react";
import { DatePickerInput } from "@mantine/dates";
import { Select,Container,TextInput } from "@mantine/core";

const dayOffPage = () => {
    const [date, setDate] = useState<Date | null>(null);
    const [dayOffValue, setDayOffValue] = useState<string | null>(null);
    const [reason,setReason] = useState('');

    console.log(date);
    console.log(dayOffValue);
    return (
        <Container>
            <h1>휴가 신청 페이지</h1>
            <DatePickerInput
                label="날짜 선택"
                placeholder="날짜를 골라주세요."
                value={date}
                onChange={setDate}
                mx="auto"
                maw={400}
                radius="md"
            />
            <Select
                maw={400}
                mx="auto"
                radius="md"
                label="휴가 종류 선택"
                placeholder="휴가 종류 선택"
                value={dayOffValue}
                onChange={setDayOffValue}
                data={[
                    { value: "1", label: "전일(1일 소진)" },
                    { value: "0.5", label: "반차(0.5일 소진)" },
                ]}
            />
            <TextInput
                label="휴가 사유 입력"
                maw={400}
                mx="auto"
                radius="md"
                placeholder="사유를 입력해주세요."
                onChange={(e) => {setReason(e.currentTarget.value)}}
                value={reason}
            />
        </Container>
    );
};

export default dayOffPage;
