/*
 * @Author: 孙飞
 * @Date: 2024-09-04 13:35:14
 * @LastEditors: 孙飞
 * @LastEditTime: 2024-09-04 19:12:53
 * @Description: 做好每一件小事~
 */
import React, { useState, useEffect } from "react";
import { getProgressList } from '@/apis'
import { convertISOToLocalDateTime, formatDate } from '@/tools'

const TimelineItem = ({
  createdTime,
  date,
  name,
  title,
  description,
  iconFill,
  iconPath,
  body,
  progress
}) => (
  <div className="relative">
    <div className="md:flex items-center md:space-x-4 mb-3">
      <div className="flex items-center space-x-4 md:space-x-2 md:space-x-reverse">
        {/* Icon */}
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full bg-purple-500 shadow md:order-1 ${iconFill}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
            <path d={iconPath} />
          </svg>
        </div>
        {/* Date */}
        <time className="text-sm font-bold text-indigo-500 md:w-28">
          {formatDate(convertISOToLocalDateTime(createdTime, 'Asia/shanghai'))}
        </time>
      </div>
      {/* Title */}
      <div className="font-[oklch(var(--bc))] ml-14">
        <span className="text-[oklch(var(--su))] font-bold">{name}</span>{" "}
        {title}
      </div>
    </div>
    {/* Card */}
    <div className="flex flex-col gap-3 items-end p-4 rounded-lg border shadow ml-14 md:ml-44">
      <div className="text-xs lg:text-base text-wrap">
        <div
          dangerouslySetInnerHTML={{
            __html: body.replace(/\n/g, '<br>'),
          }}
        />
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-between w-full">
        <div className="space-x-2">
          <progress className="progress progress-primary w-56" value={progress} max="100"></progress>
          <span className="text-sm text-blue-600">{progress} %</span>
        </div>
        <div className="text-sm">{formatDate(convertISOToLocalDateTime(createdTime, 'Asia/shanghai'))}</div>
      </div>
    </div>
  </div>
);

const Process = () => {
  const [progressList, setProgressList] = useState([])
  useEffect(() => {
    getProgressList().then(res => {
      setProgressList(res.data)
    })
  }, [])
  return (
    <section className="relative flex flex-col justify-center overflow-hidden antialiased">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col justify-center divide-y divide-slate-200 ">
          <div className="w-full max-w-3xl mx-auto">
            {/* Vertical Timeline */}
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[8.75rem] md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-purple-500  before:via-purple-400 before:to-transparent">
              {progressList.map((item, index) => (
                <TimelineItem
                  key={item.id}
                  title={item.title}
                  date={item.date}
                  name={item.username}
                  description=""
                  body={item.body}
                  createdTime={item.created_at}
                  progress={Math.round(item.times * 100 / item.expected_completion_days)}
                  iconFill="fill-white"
                  iconPath="M8 0a8 8 0 1 0 8 8 8.009 8.009 0 0 0-8-8Zm0 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"
                />
              ))}


            </div>
            {/* End: Vertical Timeline */}
          </div>
        </div>
      </div>
    </section>
  )

}
export default Process;
