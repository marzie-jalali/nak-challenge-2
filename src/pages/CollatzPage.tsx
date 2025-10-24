import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useCollatzStore } from "../store/collatzStore";
import { yupResolver } from "@hookform/resolvers/yup";
import { computeCollatz } from "../utils/collatz";
import CustomButton from "../components/shared/tools/CustomButton";
import Divider from "../components/shared/tools/Divider";

type FormValues = { number: number };

const schema = yup
  .object({
    number: yup
      .number()
      .typeError("validation.number_required")
      .required("validation.number_required")
      .integer("validation.integer")
      .min(1, "validation.min_zero"),
  })
  .required();

const CollatzPage = () => {
  const { t } = useTranslation();
  const setLastResult = useCollatzStore((s) => s.setLastResult);
  const lastResult = useCollatzStore((s) => s.lastResult);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: { number: 0 },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const res = computeCollatz(data.number);
      setLastResult(res);
    } catch (err) {
      console.error(err);
      setLastResult(null);
    }
  };
  return (
    <CollatzContainer>
      <HeadingContainer>
        <h2>{t("collatz_heading")}</h2>
      </HeadingContainer>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Input type="number" min="0" {...register("number")} />
        {errors.number && (
          <ErrorMessage>{t(errors.number.message || "")}</ErrorMessage>
        )}
        <LayerContainer>
          <CustomButton type="submit">{t("calculate")}</CustomButton>
        </LayerContainer>
        <Divider margin="40px 0" color="#CCCCCC" thickness="1px" />
        <LayerContainer>
          <ResultInput>
            {lastResult ? (
              <div>
                <Value>{lastResult.loops}</Value>
              </div>
            ) : (
              <div>
                Enter a number and click submit to see the Collatz sequence
              </div>
            )}
          </ResultInput>
        </LayerContainer>
      </FormContainer>
    </CollatzContainer>
  );
};

export default CollatzPage;

const CollatzContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
const HeadingContainer = styled.div`
  text-align: center;
  margin: 24px 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 20px 16px;
  border-radius: 8px;
  border: 1px solid #cccccc;
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

const ResultInput = styled.div`
  padding: 40px 16px;
  border-radius: 8px;
  background-color: #cccccc;
  border: 1px solid #f1f1f1;
  text-align: center;
  width: 100%;
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
