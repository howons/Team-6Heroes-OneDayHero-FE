"use client";

import { FormEvent, useRef, useState } from "react";

import Category from "@/components/common/Category";
import Container from "@/components/common/Container";
import useFormValidation, { FormErrors } from "@/hooks/useFormValidation";
import { apiUrl } from "@/services/urls";

import CustomCalendar from "./CustomCalendar";
import Input from "./Input";
import InputLabel from "./InputLabel";
import Select from "./Select";
import Textarea from "./Textarea";

const hours = Array.from({ length: 24 }, (_, index) => index);

const CreateForm = () => {
  const [categoryId, setCategoryId] = useState<number>(0);
  const [errors, setErrors] = useState<FormErrors | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);
  const startRef = useRef<HTMLSelectElement | null>(null);
  const endRef = useRef<HTMLSelectElement | null>(null);
  const priceRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const { formValidation } = useFormValidation();

  const handleSelect = (idx: number) => {
    if (idx > 0) {
      setCategoryId(idx);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("눌렀다.");
    const data = {
      categoryId,
      missionInfo: {
        content: contentRef.current?.value ?? "",
        missionDate: dateRef.current?.value ?? "",
        startTime: startRef.current?.value ?? "",
        endTime: endRef.current?.value ?? "",
        price: priceRef.current?.value ?? ""
      }
    };

    const validationErrors = formValidation(data);
    setErrors(validationErrors);

    if (!Object.keys(validationErrors).length) {
      await fetch(apiUrl("/missions/create"), {
        method: "POST",
        body: JSON.stringify(data)
      });
    }
  };

  return (
    <form
      className="flex w-full flex-col items-center"
      onSubmit={handleSubmit}
      id="missionCreateForm">
      <Container className="flex w-full flex-col gap-3 p-5">
        <span className="text-base font-semibold">
          찾는 카테고리가 있으신가요?
        </span>
        <Category onSelect={handleSelect} error={errors?.categoryId} />
      </Container>
      <Container className="flex w-full flex-col gap-5 p-5">
        <div className="flex flex-col">
          <span className="mb-4 text-base font-semibold">
            미션에 대한 정보를 알려주세요!
          </span>
          <InputLabel htmlFor="title">제목</InputLabel>
          <Input
            id="title"
            ref={titleRef}
            placeholder="미션 제목을 입력하세요."
          />
        </div>
        <div className="flex flex-col">
          <InputLabel htmlFor="missionDate">날짜</InputLabel>
          <CustomCalendar
            id="missionDate"
            ref={dateRef}
            error={errors?.missionInfo?.missionDate}
          />
        </div>
        <div>
          <InputLabel htmlFor="startTime">시간</InputLabel>
          <div className="mt-1 flex gap-4">
            <Select
              id="startTime"
              ref={startRef}
              error={errors?.missionInfo?.startTime}>
              {hours.map((hour) => (
                <option key={hour}>{hour}:00</option>
              ))}
            </Select>
            <span>~</span>
            <Select
              id="endTime"
              ref={endRef}
              error={errors?.missionInfo?.endTime}>
              {hours.map((hour) => (
                <option key={hour}>{hour}:00</option>
              ))}
            </Select>
          </div>
        </div>
        <div className="flex flex-col">
          <InputLabel htmlFor="price">포상금</InputLabel>
          <Input
            id="price"
            ref={priceRef}
            className="w-6/12"
            error={errors?.missionInfo?.price}
          />
        </div>
        <div className="flex flex-col">
          <InputLabel htmlFor="content">미션 내용</InputLabel>
          <Textarea
            id="content"
            ref={contentRef}
            error={errors?.missionInfo?.content}
          />
        </div>
      </Container>
    </form>
  );
};

export default CreateForm;