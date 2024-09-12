import React, { useState } from "react";
import InviteImage from "./Wedding Card 5  1.png";
import { useMutation, useQuery } from "@tanstack/react-query";
import { request } from "./request";
import { HashLoader, PacmanLoader } from "react-spinners";
import { useLocation, useParams } from "react-router";
import { useSnackbar } from "notistack";
const InviteCard = () => {
  const { invite } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [apolgizeText, setApolgizeText] = useState("");
  const [controller, setController] = useState({
    open: false,
    status: null,
  });
  const { enqueueSnackbar } = useSnackbar();
  const uuid = queryParams.get("uuid");
  const updateInvitation = useMutation({
    mutationFn: (option) => {
      return request({
        url: `/invitees/${invite}?uuid=${uuid}`,
        method: "patch",
        data: option,
      });
    },
    onSuccess: (data) => {
      setController(false);
      query.refetch();
      enqueueSnackbar(data.data.message, { variant: "success" });
    },
    onError: (error) => {
      query.refetch();
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    },
  });

  const handeUpdateInvitation = (status) => {
    let option = {
      status: status,
      uuid,
    };
    if (apolgizeText) {
      option.apology_message = apolgizeText;
    }

    updateInvitation.mutate(option);
  };

  const query = useQuery({
    queryKey: [`get-invit-information-${uuid}-${invite}`],
    queryFn: () => {
      return request({
        url: `/showInvitationInfo/${invite}?uuid=${uuid}`,
      });
    },
    refetchInterval : 500
  });

  if (query.isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <PacmanLoader color="#36d7b7" />
      </div>
    );
  }
  if (query.isError) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <h1 className="capitalize text-[18px] text-center text-red-900 max-w-[500px]">
          error happend while processing your request , please reload the page
          or call support
        </h1>
      </div>
    );
  }

  return (
    <main className="h-screen w-full">
      <div className="w-full mb-2">
        <div class="flex flex-col md:flex-row gap-2">
          <div className="flex-row flex-1 h-screen">
            <div className="flex h-full p-1 items-center justify-center">
              <img
                src={
                  query.data.data.template || (
                    <span className="text-red-400">...</span>
                  )
                }
                alt="invitaion"
                className="max-w-full max-h-[600px]"
              />
            </div>
          </div>
          <div className="flex-row flex-1">
            <div className="flex items-center justify-center flex-col h-full px-2">
              <div className="mb-6">
                <p className="text-center capitalize text-[28px]">
                  {query.data.data.category || (
                    <span className="text-red-400">...</span>
                  )}
                </p>
              </div>
              <div className="flex items-center w-full">
                <p className="flex-row flex-1 text-center px-6 py-2 bg-[#F9F9F9] text-[20px] rounded-tl-[12px]">
                  {query.data.data.event_name || (
                    <span className="text-red-400">...</span>
                  )}
                </p>
                <p className="flex-row flex-1  px-6 py-2 bg-[#4AB3541A] text-center text-[20px] rounded-tr-[12px]">
                  اسم المناسبة
                </p>
              </div>
              <div className="flex items-center w-full">
                <p className="flex-row flex-1 text-center px-6 py-2 bg-[#F9F9F9] text-[20px] ">
                  {query.data.data.inviter || (
                    <span className="text-red-400">...</span>
                  )}
                </p>
                <p className="flex-row flex-1  px-6 py-2 bg-[#4AB3541A] text-center text-[20px]">
                  اسم الداعي
                </p>
              </div>
              <div className="flex items-center w-full">
                <p className="flex-row flex-1 text-center px-6 py-2 bg-[#F9F9F9] text-[20px] ">
                  {query.data.data.miladi_date || (
                    <span className="text-red-400">...</span>
                  )}
                </p>
                <p className="flex-row flex-1  px-6 py-2 bg-[#4AB3541A] text-center text-[20px] ">
                  التاريخ الميلادي
                </p>
              </div>
              <div className="flex items-center w-full">
                <p className="flex-row flex-1 text-center px-6 py-2 bg-[#F9F9F9] text-[20px] ">
                  {query.data.data.hijri_date || (
                    <span className="text-red-400">...</span>
                  )}
                </p>
                <p className="flex-row flex-1  px-6 py-2 bg-[#4AB3541A] text-center text-[20px]">
                  التاريخ الهجري
                </p>
              </div>
              <div className="flex items-center w-full">
                <p className="flex-row flex-1 text-center px-6 py-2 bg-[#F9F9F9] text-[20px]">
                  <a
                    href={query.data.data.location_link}
                    className="py-1 px-3 bg-green-50 rounded-md"
                  >
                    location
                  </a>
                </p>
                <p className="flex-row flex-1  px-6 py-2 bg-[#4AB3541A] text-center text-[20px] ">
                  رابط الموقع
                </p>
              </div>
              <div className="flex items-center w-full">
                <p className="flex-row flex-1 text-center px-6 py-2 bg-[#F9F9F9] text-[20px] ">
                  {query.data.data.city || (
                    <span className="text-red-400">...</span>
                  )}
                </p>
                <p className="flex-row flex-1  px-6 py-2 bg-[#4AB3541A] text-center text-[20px]">
                  المدينة
                </p>
              </div>
              <div className="flex items-center w-full">
                <p className="flex-row flex-1 text-center px-6 py-2 bg-[#F9F9F9] text-[20px]">
                  {query.data.data.region || (
                    <span className="text-red-400">...</span>
                  )}
                </p>
                <p className="flex-row flex-1  px-6 py-2 bg-[#4AB3541A] text-center text-[20px] ">
                  المنطقة
                </p>
              </div>
              <div className="flex items-center w-full">
                <p className="flex-row flex-1 text-center px-6 py-2 bg-[#F9F9F9] text-[20px] rounded-bl-[12px]">
                  {query.data.data.location_name || (
                    <span className="text-red-400">...</span>
                  )}
                </p>
                <p className="flex-row flex-1  px-6 py-2 bg-[#4AB3541A] text-center text-[20px] rounded-br-[12px]">
                  الموقع
                </p>
              </div>
              <div className="flex flex-row w-full gap-4 mt-3">
                <button
                  disabled={
                    updateInvitation.isPending ||
                    +query.data.data.status == 1 ||
                    +query.data.data.status == 3 ||
                    query.isRefetching
                  }
                  onClick={() =>
                    setController({
                      status: 3,
                      open: true,
                    })
                  }
                  className="flex-row capitalize disabled:bg-red-200 text-white flex-1 px-7 py-3 w-full bg-[#F08D8E] rounded-lg"
                >
                  reject
                </button>
                <button
                  disabled={
                    updateInvitation.isPending ||
                    +query.data.data.status === 1 ||
                    +query.data.data.status === 3 ||
                    query.isRefetching
                  }
                  onClick={() =>
                    setController({
                      status: 1,
                      open: true,
                    })
                  }
                  // onClick={() => handeUpdateInvitation(1)}
                  className="flex-row capitalize flex items-center justify-center disabled:bg-green-200 text-white flex-1 px-7 py-3 w-full bg-[#4AB355] rounded-lg"
                >
                  {updateInvitation.isPending && (
                    <HashLoader size={20} color="#36d7b7" />
                  )}
                  accept
                </button>
              </div>
              {controller.open && (
                <div className="p-4">
                  <input
                    type="text"
                    value={apolgizeText}
                    onChange={(e) => setApolgizeText(e.target.value)}
                    placeholder="Message"
                    className="input-aplogy mb-1"
                  />
                  <button
                    disabled={updateInvitation.isPending || !apolgizeText}
                    onClick={() => handeUpdateInvitation(controller.status)}
                    className="flex-row capitalize flex items-center  justify-center mb-2 text-white disabled:bg-red-100 disabled:cursor-not-allowed flex-1 px-7 py-3 w-full bg-[#F08D8E] rounded-lg"
                  >
                    {updateInvitation.isPending && (
                      <HashLoader color="#36d7b7" size={20} />
                    )}
                    confirm
                  </button>
                  <button
                    disabled={updateInvitation.isPending}
                    onClick={() => {
                      setController({
                        open: false,
                        status: null,
                      });
                      setApolgizeText("");
                    }}
                    className="flex-row capitalize disabled:bg-red-500 text-white flex-1 px-7 py-3 w-full bg-red-800 rounded-lg"
                  >
                    cancle
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center flex-wrap justify-center gap-10 mb-10 px-20">
        {+query.data.data.status === 1
          ? query.data.data.QRCode?.map((qr) => {
              return (
                <img
                  onClick={(e) => e.target.requestFullscreen()}
                  src={`https://api.dev1.gomaplus.tech${qr.qr_code}`}
                  className={"max-w-full"}
                  style={{
                    filter : `${qr.status ? 'blur(5px)' : 'none'}`,
                  }}
                />
              );
            })
          : undefined}
      </div>
      <div className="h-[80px] flex items-center justify-center bg-[#777777]">
        <div className="w-fit flex gap-7 items-center justify-center">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_2289_1780)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M20.0007 3.33301C10.7957 3.33301 3.33398 10.7947 3.33398 19.9997C3.33398 23.1497 4.20898 26.0997 5.73065 28.613L4.24398 33.6663C4.15863 33.9565 4.15301 34.2643 4.22773 34.5573C4.30244 34.8504 4.45473 35.1179 4.66858 35.3317C4.88244 35.5456 5.14995 35.6979 5.44301 35.7726C5.73607 35.8473 6.04385 35.8417 6.33398 35.7563L11.3873 34.2697C13.9851 35.8415 16.9644 36.6705 20.0007 36.6663C29.2057 36.6663 36.6673 29.2047 36.6673 19.9997C36.6673 10.7947 29.2057 3.33301 20.0007 3.33301ZM16.2307 23.7713C19.6023 27.1413 22.8207 27.5863 23.9573 27.628C25.6856 27.6913 27.369 26.3713 28.024 24.8397C28.1067 24.6491 28.1367 24.4399 28.1109 24.2338C28.0851 24.0277 28.0044 23.8323 27.8773 23.668C26.964 22.5013 25.729 21.663 24.5223 20.8297C24.2704 20.6555 23.9608 20.5856 23.6584 20.6347C23.3561 20.6838 23.0845 20.848 22.9007 21.093L21.9007 22.618C21.8481 22.7 21.7662 22.7588 21.6716 22.7823C21.5771 22.8059 21.4772 22.7924 21.3923 22.7447C20.714 22.3563 19.7257 21.6963 19.0157 20.9863C18.3057 20.2763 17.6857 19.333 17.3373 18.698C17.2941 18.6173 17.2816 18.5237 17.3022 18.4346C17.3227 18.3454 17.3749 18.2667 17.449 18.213L18.989 17.0697C19.2088 16.8786 19.3506 16.6133 19.3875 16.3244C19.4243 16.0356 19.3537 15.7432 19.189 15.503C18.4423 14.4097 17.5723 13.0197 16.3107 12.098C16.1478 11.98 15.9571 11.9064 15.7572 11.8845C15.5573 11.8626 15.3552 11.8931 15.1707 11.973C13.6373 12.6297 12.3107 14.313 12.374 16.0447C12.4157 17.1813 12.8607 20.3997 16.2307 23.7713Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_2289_1780">
                <rect width="40" height="40" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.666 13.333C29.3182 13.333 31.8617 14.3866 33.7371 16.2619C35.6124 18.1373 36.666 20.6808 36.666 23.333V34.9997H29.9993V23.333C29.9993 22.449 29.6482 21.6011 29.023 20.976C28.3979 20.3509 27.5501 19.9997 26.666 19.9997C25.782 19.9997 24.9341 20.3509 24.309 20.976C23.6839 21.6011 23.3327 22.449 23.3327 23.333V34.9997H16.666V23.333C16.666 20.6808 17.7196 18.1373 19.5949 16.2619C21.4703 14.3866 24.0139 13.333 26.666 13.333Z"
              fill="white"
            />
            <path d="M10.0007 15H3.33398V35H10.0007V15Z" fill="white" />
            <path
              d="M6.66732 9.99967C8.50827 9.99967 10.0007 8.50729 10.0007 6.66634C10.0007 4.82539 8.50827 3.33301 6.66732 3.33301C4.82637 3.33301 3.33398 4.82539 3.33398 6.66634C3.33398 8.50729 4.82637 9.99967 6.66732 9.99967Z"
              fill="white"
            />
          </svg>
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28.334 3.33301H11.6673C7.06494 3.33301 3.33398 7.06397 3.33398 11.6663V28.333C3.33398 32.9354 7.06494 36.6663 11.6673 36.6663H28.334C32.9364 36.6663 36.6673 32.9354 36.6673 28.333V11.6663C36.6673 7.06397 32.9364 3.33301 28.334 3.33301Z"
              fill="white"
            />
            <path
              d="M26.6675 18.9495C26.8732 20.3366 26.6362 21.7532 25.9904 22.9979C25.3446 24.2425 24.3227 25.2519 23.0702 25.8823C21.8177 26.5127 20.3982 26.7322 19.0138 26.5094C17.6294 26.2866 16.3504 25.633 15.3589 24.6415C14.3673 23.6499 13.7137 22.371 13.4909 20.9865C13.2682 19.6021 13.4876 18.1827 14.118 16.9301C14.7485 15.6776 15.7578 14.6558 17.0025 14.0099C18.2471 13.3641 19.6637 13.1272 21.0508 13.3329C22.4657 13.5427 23.7756 14.202 24.787 15.2134C25.7984 16.2248 26.4577 17.5347 26.6675 18.9495Z"
              stroke="#4AB37E"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M29.166 10.833H29.1832"
              stroke="#4AB37E"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.66602 3.33301H5.83268L30.8327 36.6663H26.666L1.66602 3.33301ZM9.16602 3.33301H13.3327L38.3327 36.6663H34.166L9.16602 3.33301ZM4.99935 3.33301H13.3327V6.66634H4.99935V3.33301ZM26.666 33.333H34.9994V36.6663H26.666V33.333ZM30.8327 3.33301H36.666L8.33268 36.6663H2.49935L30.8327 3.33301Z"
              fill="white"
            />
          </svg>
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M29.9993 3.33301H24.9993C22.7892 3.33301 20.6696 4.21098 19.1068 5.77378C17.544 7.33659 16.666 9.4562 16.666 11.6663V16.6663H11.666V23.333H16.666V36.6663H23.3327V23.333H28.3327L29.9993 16.6663H23.3327V11.6663C23.3327 11.2243 23.5083 10.8004 23.8208 10.4878C24.1334 10.1753 24.5573 9.99967 24.9993 9.99967H29.9993V3.33301Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </main>
  );
};

export default InviteCard;
