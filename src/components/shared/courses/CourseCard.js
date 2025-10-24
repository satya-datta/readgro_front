"use client";
import { useWishlistContext } from "@/contexts/WshlistContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CourseCard = ({ course, type }) => {
  const { addProductToWishlist } = useWishlistContext();
  const {
    id,
    title,
    lesson,
    image,
    insName,
    isActive,
    isCompleted,
    completedParchent,
  } = course;

  return (
    <div
      className={`group  ${
        type === "primary" || type === "primaryMd"
          ? ""
          : `w-full sm:w-1/2 lg:w-1/3 grid-item ${
              type === "lg" ? "xl:w-1/4" : ""
            }`
      }`}
    >
      <div className={`  ${type === "primaryMd" ? "" : "sm:px-15px  mb-30px"}`}>
        <div className="p-15px bg-whiteColor shadow-brand dark:bg-darkdeep3-dark dark:shadow-brand-dark">
          {/* card image */}
          <div className="relative mb-2">
            <Link
              href={`/courses/${id}`}
              className="w-full overflow-hidden rounded"
            >
              <Image
                src={image}
                alt={title}
                priority={true}
                className="w-full transition-all duration-300 group-hover:scale-110"
                width={300}
                height={200}
              />
            </Link>
          </div>
          {/* card content */}
          <div>
            <div className="grid grid-cols-2 mb-3">
              <div className="flex items-center">
                <div>
                  <i className="icofont-book-alt pr-5px text-primaryColor text-lg"></i>
                </div>
                <div>
                  <span className="text-sm text-black dark:text-blackColor-dark">
                    {lesson} Lessons
                  </span>
                </div>
              </div>
            </div>
            <h5 className={`${type === "primaryMd" ? "text-lg " : "text-xl "}`}>
              <Link
                href={`/courses/${id}`}
                className={`font-semibold text-blackColor mb-10px dark:text-blackColor-dark hover:text-primaryColor dark:hover:text-primaryColor ${
                  type === "primaryMd" ? "leading-25px" : "leading-27px "
                } `}
              >
                {title}
              </Link>
            </h5>

            {/* Instructor section */}
            <div className="grid grid-cols-1 md:grid-cols-2 pt-15px border-t border-borderColor">
              <div>
                <h6>
                  <Link
                    href={`/instructors/${id}`}
                    className="text-base font-bold flex items-center hover:text-primaryColor dark:text-blackColor-dark dark:hover:text-primaryColor"
                  >
                    <span className="whitespace-nowrap">{insName}</span>
                  </Link>
                </h6>
              </div>
            </div>

            {/* Progress bar */}
            {isCompleted || isActive ? (
              <div>
                <div className="h-25px w-full bg-primaryColor-x-light rounded-md relative mt-5 mb-15px">
                  <div
                    className="text-center bg-primaryColor absolute top-0 left-0 rounded-md leading-25px"
                    style={{
                      width: isActive ? completedParchent + "%" : "100%",
                      height: "100%",
                    }}
                  >
                    <span className="text-size-10 text-whiteColor block leading-25px">
                      {isActive ? completedParchent : 100}% Complete
                    </span>
                  </div>
                </div>
                {isCompleted && (
                  <Link
                    href="/dashboards/create-course"
                    className="text-size-15 text-whiteColor bg-secondaryColor w-full px-25px py-10px border border-secondaryColor hover:text-secondaryColor hover:bg-whiteColor rounded group text-nowrap text-center"
                  >
                    Download Certificate
                  </Link>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
