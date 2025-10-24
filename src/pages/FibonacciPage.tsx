import styled from "@emotion/styled";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useFibStore } from "../store/fibonacciStore";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import CustomButton from "../components/shared/tools/CustomButton";
import ButtonLayout from "../components/layout/ButtonLayout";
import Divider from "../components/shared/tools/Divider";
import { getFibonacciNeighbors } from "../utils/fibonacci";

type FormValues = { number: number };

const schema = yup
  .object({
    number: yup
      .number()
      .typeError("number_required")
      .required("number_required")
      .integer("integer")
      .min(0, "min_zero"),
  })
  .required();

const FibonacciPage = () => {
  const { t } = useTranslation();
  const [result, setResult] = useState<{ prev: number; next: number } | null>(
    null
  );
  const [inputNumber, setInputNumber] = useState<number | null>(null);

  const addQuery = useFibStore((state) => state.addQuery);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { number: 0 },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted with data:", data);
    try {
      const num = Math.floor(Number(data.number));
      console.log("Calculating Fibonacci neighbors for:", num);
      const res = getFibonacciNeighbors(num);
      console.log("Result:", res);
      setResult(res);
      setInputNumber(num);
      addQuery(num);
    } catch (error) {
      console.error("Error calculating Fibonacci:", error);
    }
  };

  return (
    <LayoutWrapper>
      <HeadingContainer>
        <h2>{t("fibonacci_heading")}</h2>
      </HeadingContainer>
      <FormLayout>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Formcontainer>
            <Label>{t("enter_a_number")}</Label>
            <Input type="number" min="0" {...register("number")} />
            {errors.number && (
              <ErrorMessage>{t(errors.number.message || "")}</ErrorMessage>
            )}
            <ButtonLayout>
              <CustomButton type="submit">{t("submit")}</CustomButton>
            </ButtonLayout>
          </Formcontainer>
        </form>
        <Divider margin="40px 0" color="#CCCCCC" thickness="1px" />
        <InputResultLayout>
          <ResultInput>
            <Value>{result?.prev || "-"}</Value>
          </ResultInput>
          <ResultInput>
            <Value>{inputNumber !== null ? inputNumber : "-"}</Value>
          </ResultInput>
          <ResultInput>
            <Value>{result?.next || "-"}</Value>
          </ResultInput>
        </InputResultLayout>
      </FormLayout>
    </LayoutWrapper>
  );
};

export default FibonacciPage;

const LayoutWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HeadingContainer = styled.div`
  text-align: center;
  margin: 24px 0;
`;

const FormLayout = styled.div`
  max-width: 696px;
`;

const Label = styled.div`
  font-size: 16px;
  color: #242424;
  font-weight: 600;
`;

const Input = styled.input`
  padding: 20px 16px;
  border-radius: 8px;
  border: 1px solid #cccccc;
  flex: 1;
  font-size: 48px;
  text-align: center;

  /* Hide the number input spinners */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

const Formcontainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputResultLayout = styled.div`
  width: 100%;
  border-radius: 16px;
  box-shadow: 0px 4px 22px rgba(0, 0, 0, 0.04);
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
  padding: 16px;
`;

const ResultInput = styled.div`
  padding: 40px 16px;
  border-radius: 8px;
  background-color: #cccccc;
  border: 1px solid #f1f1f1;
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Value = styled.div`
  font-size: 48px;
  color: #242424;
  font-weight: 600;
`;

const ErrorMessage = styled.div`
  color: #dc362e;
  font-size: 12px;
  margin-top: 4px;
`;
