import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import PageWrapper from "../layout/user/PageWrapper";
import CustomInput from "../shared/tools/CustomInput";
import type { NewUser } from "../../types/user";
import { useTranslation } from "react-i18next";
import { useUserStore } from "../../store/userStore";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomButton from "../shared/tools/CustomButton";
import Divider from "../shared/tools/Divider";

const usernameRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/;
const phoneRegex = /^[0-9]{10,}$/;

const userSchema = yup.object({
  name: yup.string().required("name_required"),
  userName: yup
    .string()
    .required("username_required")
    .matches(usernameRegex, "username_invalid_format"),
  email: yup.string().required("email_required").email("email_invalid_format"),
  phone: yup
    .string()
    .required("phone_required")
    .matches(phoneRegex, "phone_just_numbers"),
  status: yup
    .string()
    .oneOf(["active", "not_active", ""], "status_invalid_value")
    .optional()
    .transform((value) => (value === "" ? undefined : value)),
});

type FormData = yup.InferType<typeof userSchema>;

const UserForm = () => {
  const { id } = useParams<{ id: string }>();
  const addUser = useUserStore((state) => state.addUser);
  const updateUser = useUserStore((state) => state.updateUser);
  const users = useUserStore((state) => state.users);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const existingUser = isEditMode
    ? users.find((user) => user.id === parseInt(id!))
    : null;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(userSchema) as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    defaultValues: {
      name: "",
      userName: "",
      email: "",
      phone: "",
      status: undefined,
    },
    mode: "onChange",
  });

  const watchedFields = watch(["name", "userName", "email", "phone"]);
  const allRequiredFieldsFilled = watchedFields.every(
    (field) => field && field.trim() !== ""
  );
  const isSubmitDisabled = !isEditMode && !allRequiredFieldsFilled;

  useEffect(() => {
    if (isEditMode && existingUser) {
      reset({
        name: existingUser.name,
        userName: existingUser.userName,
        email: existingUser.email,
        phone: existingUser.phone,
        status: existingUser.status || undefined,
      });
    }
  }, [isEditMode, existingUser, reset]);

  const onSubmit = (data: FormData) => {
    const userData: NewUser = {
      name: data.name,
      userName: data.userName,
      email: data.email,
      phone: data.phone,
      status:
        data.status === undefined
          ? null
          : (data.status as "active" | "not_active"),
    };

    if (isEditMode && existingUser) {
      updateUser(existingUser.id, userData);
    } else {
      addUser(userData);
    }
    navigate("/users");
  };

  return (
    <PageWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer>
          <GridInputs>
            <CustomInput
              label={t("Name")}
              type="text"
              {...register("name")}
              required
              error={errors.name ? t(errors.name.message || "") : ""}
            />
            <CustomInput
              label={t("User Name")}
              type="text"
              {...register("userName")}
              required
              error={errors.userName ? t(errors.userName.message || "") : ""}
            />
            <CustomInput
              label={t("Email")}
              type="email"
              {...register("email")}
              required
              error={errors.email ? t(errors.email.message || "") : ""}
            />
            <CustomInput
              label={t("Phone")}
              type="tel"
              {...register("phone")}
              required
              error={errors.phone ? t(errors.phone.message || "") : ""}
            />
          </GridInputs>
          <Divider margin="24px 0" color="#e0e0e0" thickness="1px" />
          <SelectContainer>
            <label>{t("Status")}</label>
            <select {...register("status")}>
              <option value="active">{t("active")}</option>
              <option value="not_active">{t("inactive")}</option>
              <option value="">{t("unknown")}</option>
            </select>
          </SelectContainer>
        </FormContainer>

        <LayerContainer>
          <CustomButton type="submit" disabled={isSubmitDisabled}>
            {t("Submit")}
          </CustomButton>
        </LayerContainer>
      </form>
    </PageWrapper>
  );
};

export default UserForm;

const FormContainer = styled.div`
  width: 100%;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0px 4px 22px rgba(0, 0, 0, 0.04);
  background-color: #ffffff;
  margin-top: 48px;
  box-sizing: border-box;
`;

const GridInputs = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  width: 100%;
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 33%;
  min-width: 260px;

  select {
    width: 100%;
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 14px;
    background-color: #fff;
    display: grid;
  }
`;

const LayerContainer = styled.div`
  padding: 20px 16px;
  border-radius: 8px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  align-items: center;
  margin-top: 24px;
`;
