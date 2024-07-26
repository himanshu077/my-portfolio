import { clsx } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";
import { PhoneNumberUtil } from 'google-libphonenumber';

export function cn(...args) {
  return twMerge(clsx(...args));
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function formatDate(date) {
  return moment(date).format("MMMM YYYY");
}

export function formatDateWithDay(date) {
  return moment(date).format("MMMM Do YYYY");
}

export const defaultAvatarImage =
  "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg";

export const extractName = (name) => {
  // name can have any special character, so we need to split it by all special characters
  // and then join it with space
  return name
    .split(/[^A-Za-z]/)
    .filter(Boolean)
    .join(" ");
};

const phoneUtil = PhoneNumberUtil.getInstance();

export const isPhoneValid = (phone) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};