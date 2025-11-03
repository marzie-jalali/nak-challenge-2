import styled from "@emotion/styled";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import CustomButton from "../components/shared/tools/CustomButton";
import Divider from "../components/shared/tools/Divider";
import { getFibonacciNeighbors } from "../utils/fibonacci";

type FormValues = { number: number };

const schema = yup
  .object({
    number: yup
      .number()
      .typeError("validation.number_required")
      .required("validation.number_required")
      .integer("validation.integer")
      .min(0, "validation.min_zero"),
  })
  .required();

const FibonacciPage = () => {
  const { t } = useTranslation();
  const [result, setResult] = useState<{ prev: number; next: number } | null>(
    null
  );
  const [inputNumber, setInputNumber] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { number: 0 },
  });
  const watchedFields = watch("number") as number;

  useEffect(() => {
    if (!watchedFields && (result !== null || inputNumber !== null)) {
      setResult(null);
      setInputNumber(null);
    }
  }, [watchedFields]);

  const onSubmit = (data: FormValues) => {
    try {
      const num = Math.floor(Number(data.number));
      const res = getFibonacciNeighbors(num);
      setResult(res);
      setInputNumber(num);
    } catch (error) {
      console.error("Error calculating Fibonacci:", error);
    }
  };

  return (
    <>
      <HeadingContainer>
        <h2>{t("fibonacci_heading")}</h2>
      </HeadingContainer>
      <FibonacciContainer>
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <div>
            {" "}
            <Label>{t("enter_a_number")}</Label>
            <Input type="number" min="0" {...register("number")} />
            {errors.number && (
              <ErrorMessage>{t(errors.number.message || "")}</ErrorMessage>
            )}
          </div>

          <LayerContainer>
            <CustomButton type="submit">{t("submit")}</CustomButton>
          </LayerContainer>
          <Divider margin="40px 0" color="#CCCCCC" thickness="1px" />
          <LayerContainer>
            <ResultInput>
              <Value>{result?.prev || "-"}</Value>
            </ResultInput>
            <ResultInput>
              <Value>{inputNumber !== null ? inputNumber : "-"}</Value>
            </ResultInput>
            <ResultInput>
              <Value>{result?.next || "-"}</Value>
            </ResultInput>
          </LayerContainer>
        </FormContainer>
      </FibonacciContainer>
    </>
  );
};

export default FibonacciPage;

const FibonacciContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HeadingContainer = styled.div`
  text-align: center;
  margin: 24px 0;
`;

const FormContainer = styled.form`
  max-width: 696px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  gap: 16px;
`;

const LayerContainer = styled.div`
  width: 100%;
  padding: 20px 16px;
  border-radius: 8px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  align-items: center;
`;

const Label = styled.div`
  font-size: 16px;
  color: #242424;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 20px 16px;
  border-radius: 8px;
  border: 1px solid #cccccc;
  flex: 1;
  font-size: 48px;
  text-align: center;
  margin-top: 4px;

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

const ResultInput = styled.div`
  width: 100%;
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
