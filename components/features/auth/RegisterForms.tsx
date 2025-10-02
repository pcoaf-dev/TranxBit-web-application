"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
// import { GoogleButton } from "./GoogleButton";
import { motion } from "framer-motion";
import { formVariants } from "@/lib/utils";
import { Loader, Check, X } from "lucide-react";
// import { useAuth } from "@/components/providers/AuthProvider";
// import { toast } from "sonner";
// import { sendGAEvent } from "@next/third-parties/google";
// import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";

interface RegisterFormProps {
  onSwitchMode: () => void;
  onRegister: (email: string) => void;
}

interface FormValidation {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  password: {
    hasMinLength: boolean;
    hasUpperCase: boolean;
    hasLowerCase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
    passwordsMatch: boolean;
  };
}

const useFormValidation = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [validation, setValidation] = useState<FormValidation>({
    firstName: false,
    lastName: false,
    email: false,
    password: {
      hasMinLength: false,
      hasUpperCase: false,
      hasLowerCase: false,
      hasNumber: false,
      hasSpecialChar: false,
      passwordsMatch: false,
    },
  });

  const updateFormData = useCallback(
    (field: keyof typeof formData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  useEffect(() => {
    const validateForm = () => {
      setValidation({
        firstName: formData.firstName.length >= 2,
        lastName: formData.lastName.length >= 2,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
        password: {
          hasMinLength: formData.password.length >= 8,
          hasUpperCase: /[A-Z]/.test(formData.password),
          hasLowerCase: /[a-z]/.test(formData.password),
          hasNumber: /[0-9]/.test(formData.password),
          hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
          passwordsMatch:
            formData.password === formData.confirmPassword &&
            formData.password !== "",
        },
      });
    };

    validateForm();
  }, [formData]);

  return {
    formData,
    validation,
    updateFormData,
  };
};

const ValidationItem = ({
  isValid,
  text,
}: {
  isValid: boolean;
  text: string;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-center gap-2 text-sm"
  >
    {isValid ? (
      <Check className="h-4 w-4 text-green-500" />
    ) : (
      <X className="h-4 w-4 text-red-500" />
    )}
    <span className={isValid ? "text-green-500" : "text-red-500"}>{text}</span>
  </motion.div>
);

// Muted style for password popover (avoid alarming red as user types)
const PasswordValidationItem = ({
  isValid,
  text,
}: {
  isValid: boolean;
  text: string;
}) => (
  <div className="flex items-center gap-2 text-sm">
    {isValid ? (
      <Check className="h-4 w-4 text-green-500" />
    ) : (
      <X className="h-4 w-4 text-muted-foreground" />
    )}
    <span className={isValid ? "text-green-500" : "text-muted-foreground"}>
      {text}
    </span>
  </div>
);

export const RegisterForm = ({
  onSwitchMode,
  onRegister,
}: RegisterFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  //   const { register } = useAuth();

  const { formData, validation, updateFormData } = useFormValidation();
  const [showPasswordHelp, setShowPasswordHelp] = useState(false);

  const passwordScore = useMemo(() => {
    const passwordValidation = validation.password;
    let score = 0;
    if (passwordValidation.hasMinLength) score += 1;
    if (passwordValidation.hasUpperCase) score += 1;
    if (passwordValidation.hasLowerCase) score += 1;
    if (passwordValidation.hasNumber) score += 1;
    if (passwordValidation.hasSpecialChar) score += 1;
    return score;
  }, [validation.password]);

  const passwordStrength = useMemo(
    () => Math.round((passwordScore / 5) * 100),
    [passwordScore]
  );

  const passwordBarColor = useMemo(() => {
    if (passwordStrength < 50) return "bg-red-500";
    if (passwordStrength < 80) return "bg-orange-500";
    return "bg-green-500";
  }, [passwordStrength]);

  useEffect(() => {
    if (!formData.password) {
      setShowPasswordHelp(false);
    }
  }, [formData.password]);

  const isPasswordSameAsEmail = useMemo(() => {
    const pwd = formData.password.trim();
    const email = formData.email.trim();
    if (!pwd || !email) return false;
    return pwd.toLowerCase() === email.toLowerCase();
  }, [formData.password, formData.email]);

  const isPasswordSameAsName = useMemo(() => {
    const pwd = formData.password.trim();
    const fn = formData.firstName.trim();
    const ln = formData.lastName.trim();
    if (!pwd) return false;
    const lowerPwd = pwd.toLowerCase();
    if (fn && lowerPwd === fn.toLowerCase()) return true;
    if (ln && lowerPwd === ln.toLowerCase()) return true;
    return false;
  }, [formData.password, formData.firstName, formData.lastName]);

  const hasForbiddenPassword = isPasswordSameAsEmail || isPasswordSameAsName;

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      try {
        if (!validation.firstName || !validation.lastName) {
          throw new Error("First and last name must be at least 2 characters");
        }

        if (!validation.email) {
          throw new Error("Please enter a valid email address");
        }

        if (!Object.values(validation.password).every(Boolean)) {
          throw new Error("Please ensure your password meets all requirements");
        }

        if (isPasswordSameAsEmail) {
          throw new Error("Password cannot be the same as your email");
        }

        if (isPasswordSameAsName) {
          throw new Error("Password cannot be your name");
        }

        // const result = await register({
        //   first_name: formData.firstName,
        //   last_name: formData.lastName,
        //   email: formData.email,
        //   password: formData.password,
        //   password_confirmation: formData.confirmPassword,
        // });

        // sendGAEvent("formSubmission", "submit", {
        //   formType: "registerForm",
        //   status: "success",
        // });

        // if (result && result.to === "verify-email") {
        //   onRegister(formData.email);
        //   setIsLoading(false);
        // }
      } catch (error) {
        // toast.error(
        //   error.message ||
        //     error.response?.data?.message ||
        //     "Please check your information and try again"
        // );
        setIsLoading(false);
        // sendGAEvent("formSubmission", "submit", {
        //   formType: "registerForm",
        //   status: "failed",
        // });
      }
    },
    [
      //   formData,
      validation,
      //   register,
      //   onRegister,
      isPasswordSameAsEmail,
      isPasswordSameAsName,
    ]
  );

  const renderForm = useMemo(
    () => (
      <motion.div
        variants={formVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="space-y-6"
      >
        {/* Google Sign Up */}
        {/* <GoogleButton /> */}

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-2 text-gray-500">OR</span>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Input
                placeholder="First name"
                value={formData.firstName}
                onChange={(e) => updateFormData("firstName", e.target.value)}
                required
                className="border-borderColorPrimary focus-visible:outline-none"
              />
              {formData.firstName && (
                <ValidationItem
                  isValid={validation.firstName}
                  text="At least 2 characters"
                />
              )}
            </div>
            <div className="space-y-2">
              <Input
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => updateFormData("lastName", e.target.value)}
                required
                className="border-borderColorPrimary focus-visible:outline-none"
              />
              {formData.lastName && (
                <ValidationItem
                  isValid={validation.lastName}
                  text="At least 2 characters"
                />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
              required
              className="border-borderColorPrimary focus-visible:outline-none"
            />
            {formData.email && (
              <ValidationItem
                isValid={validation.email}
                text="Valid email address"
              />
            )}
          </div>

          <div className="space-y-2">
            <Popover open={showPasswordHelp} onOpenChange={setShowPasswordHelp}>
              <PopoverTrigger asChild>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create password"
                  value={formData.password}
                  onChange={(e) => {
                    updateFormData("password", e.target.value);
                    if (!showPasswordHelp && e.target.value)
                      setShowPasswordHelp(true);
                  }}
                  onFocus={() => setShowPasswordHelp(true)}
                  required
                  className="border-borderColorPrimary focus-visible:outline-none"
                />
              </PopoverTrigger>
              <PopoverContent
                side="top"
                align="start"
                className="w-[340px] p-4 bg-backgroundSecondary"
                onOpenAutoFocus={(e) => e.preventDefault()}
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                <div className="space-y-3">
                  <div className="text-sm font-medium">
                    Strength: {passwordStrength}%
                  </div>
                  <Progress
                    value={passwordStrength}
                    className="h-2"
                    indicatorClassName={passwordBarColor}
                  />
                  <div className="space-y-1">
                    <div className="text-sm font-medium">
                      Password Requirements:
                    </div>
                    <PasswordValidationItem
                      isValid={validation.password.hasMinLength}
                      text="at least 8 characters"
                    />
                    <PasswordValidationItem
                      isValid={validation.password.hasNumber}
                      text="at least 1 number"
                    />
                    <PasswordValidationItem
                      isValid={validation.password.hasUpperCase}
                      text="at least 1 uppercase letter"
                    />
                    <PasswordValidationItem
                      isValid={validation.password.hasLowerCase}
                      text="at least 1 lowercase letter"
                    />
                    <PasswordValidationItem
                      isValid={validation.password.hasSpecialChar}
                      text="at least 1 special character"
                    />
                  </div>
                  <p className="text-xs text-foreground">
                    Avoid passwords you use on other sites or that are easy to
                    guess.
                  </p>
                </div>
              </PopoverContent>
            </Popover>
            {hasForbiddenPassword && (
              <div className="text-xs text-red-500">
                {isPasswordSameAsEmail
                  ? "Password cannot be the same as your email."
                  : "Password cannot be your name."}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={(e) =>
                updateFormData("confirmPassword", e.target.value)
              }
              required
              className="border-borderColorPrimary focus-visible:outline-none"
            />
            {formData.confirmPassword && (
              <ValidationItem
                isValid={validation.password.passwordsMatch}
                text="Passwords match"
              />
            )}
          </div>

          <div className="flex justify-start">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="show-password-register"
                checked={showPassword}
                onCheckedChange={(checked) =>
                  setShowPassword(checked as boolean)
                }
                className="border-borderColorPrimary focus-visible:outline-none"
              />
              <label
                htmlFor="show-password-register"
                className="text-sm text-muted-foreground cursor-pointer"
              >
                Show password
              </label>
            </div>
          </div>

          <Button
            variant="secondary"
            type="submit"
            disabled={
              isLoading ||
              !Object.values(validation).every(Boolean) ||
              !Object.values(validation.password).every(Boolean) ||
              hasForbiddenPassword
            }
            className="w-full bg-black text-white"
          >
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Register"
            )}
          </Button>
        </form>

        {/* Login Link */}
        <div className="text-center items-center text-sm">
          <span className="text-muted-foreground">
            Already have an account?{" "}
          </span>
          <Button
            variant="link"
            onClick={onSwitchMode}
            className="text-foreground text-sm underline font-medium p-0"
          >
            Log in
          </Button>
        </div>

        {/* Terms */}
        <div className="text-center text-xs text-muted-foreground">
          By continuing, you agree to Alle-AI&apos;s{" "}
          <Link href="/terms-of-service" target="_blank" className="underline">
            Terms of Service
          </Link>{" "}
          &{" "}
          <Link href="/privacy-policy" target="_blank" className="underline">
            Privacy Policy
          </Link>
        </div>
      </motion.div>
    ),
    [
      formData,
      validation,
      isLoading,
      handleSubmit,
      onSwitchMode,
      showPasswordHelp,
      passwordStrength,
      showPassword,
      hasForbiddenPassword,
      isPasswordSameAsEmail,
      passwordBarColor,
      updateFormData,
    ]
  );

  return renderForm;
};
