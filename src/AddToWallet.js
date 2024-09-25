import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { request } from "./request";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import applewallet from "./apple-wallete.png";
import googleWallet from "./google-wallet.png";
import { PacmanLoader } from "react-spinners";

const AddToWallet = ({ invitee_id, invitation_id }) => {
  const [appleOs, setAppleOs] = useState("windows");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    setAppleOs(
      navigator.userAgent.toLowerCase().includes("mac") ||
        navigator.userAgent.toLowerCase().includes("iphone") ||
        navigator.userAgent.toLowerCase().includes("ipad")
    );
  }, []);
  const addToAppleWallet = useMutation({
    mutationKey: ["add-to-apple-wallet"],
    mutationFn: (data) => {
      return request({
        url: "/createMember",
        method: "post",
        data,
      });
    },

    onSuccess: (res) => {
      const a = document.createElement("a");
      a.href = "https://pub2.pskt.io/" + res?.data?.id;
      a.target = "_blank";
      a.style.display = 'none'
      document.append(a)
      a.click();
      enqueueSnackbar(t("apple_wallet_success"), {
        variant: "success",
      });
    },
    onError: () => {
      enqueueSnackbar(t("apple_wallet_faild"), {
        variant: "error",
      });
    },
  });
  return (
    // <button
    //   onClick={() => {
    //     addToAppleWallet.mutate({
    //       invitee_id: invitee_id,
    //       invitation_id: invitation_id,
    //     });
    //   }}
    //   disabled={addToAppleWallet.isPending}
    //   className="px-4 py-1 bg-black text-white flex items-center gap-3  relative  rounded-md focus:outline-none outline-none border-none cursor-pointer"
    // >
    //   <svg
    //     xmlns="http://www.w3.org/2000/svg"
    //     height="24px"
    //     viewBox="0 -960 960 960"
    //     width="24px"
    //     className="fill-green-500"
    //   >
    //     <path d="M240-160q-66 0-113-47T80-320v-320q0-66 47-113t113-47h480q66 0 113 47t47 113v320q0 66-47 113t-113 47H240Zm0-480h480q22 0 42 5t38 16v-21q0-33-23.5-56.5T720-720H240q-33 0-56.5 23.5T160-640v21q18-11 38-16t42-5Zm-74 130 445 108q9 2 18 0t17-8l139-116q-11-15-28-24.5t-37-9.5H240q-26 0-45.5 13.5T166-510Z" />
    //   </svg>
    //   <p className="text-start">
    //     <span className="text-[16px]">{t("add_to")}</span>
    //     <br />
    //     <span className="text-[18px]">
    //       {t("add_to_wallet", {
    //         platform: appleOs ? "apple" : "google",
    //       })}
    //     </span>
    //   </p>
    // </button>
    <div>
      <p className="text-center mt-20 text-green-700 font-semibold text-[20px]">
        {t("intigration_system", {
          platform: appleOs ? t("apple") : t("google"),
        })}
      </p>
      <div className="w-full p-8  rounded-md flex items-center justify-center">
        <div>
          {addToAppleWallet.isPending ? (
            <div>
              <PacmanLoader color="#36d7b7" />
            </div>
          ) : appleOs ? (
            <img
              onClick={() => {
                addToAppleWallet.mutate({
                  invitee_id: invitee_id,
                  invitation_id: invitation_id,
                });
              }}
              src={applewallet}
              alt="applewallet"
              style={{
                maxWidth: "200px",
                cursor: "pointer",
              }}
            />
          ) : (
            <img
              onClick={() => {
                addToAppleWallet.mutate({
                  invitee_id: invitee_id,
                  invitation_id: invitation_id,
                });
              }}
              src={googleWallet}
              alt="google wallet"
              style={{
                maxWidth: "200px",
                cursor: "pointer",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddToWallet;
