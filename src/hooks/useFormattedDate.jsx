/*
 * @Author: SunFei
 * @Date: 2024-09-04 16:26:51
 * @LastEditors: SunFei
 * @LastEditTime: 2024-09-04 16:46:46
 * @Description: ISO标准时间格式化 为 2024-09-04 16:26:51~
 */
import { useState, useEffect } from "react";

export const useFormattedDate = (isoString) => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const formatDate = (isoString) => {
      const date = new Date(isoString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    if (isoString) {
      setFormattedDate(formatDate(isoString));
    }
  }, [isoString]);

  return formattedDate;
};


