import React, { useState, useEffect } from "react";
import "./MyPage.css";
import { withRouter } from "react-router-dom";
import List from "../../ToDoList/List";
import ImageUploader from "../../ImgUploadForm/ImgUploadForm";
import AchievementRate from "../../AchievementRate/AchievementRate";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";
//import NavBar from './components/views/NavBar/NavBar';

function MyPage(props) {
  const currentUsername = localStorage.getItem("userName");

  //캘린더에서 선택한 년,월,일 정보.(dafault값 : 오늘 날짜)
  const today = new Date();
  const [selectedYear, setselectedYear] = useState(today.getFullYear());
  const [selectedMonth, setselectedMonth] = useState(today.getMonth() + 1);
  const [selectedDate, setselectedDate] = useState(today.getDate());
  const [value, setvalue] = useState(today);

  useEffect(() => {
    setselectedYear(value.getFullYear());
    setselectedMonth(value.getMonth() + 1);
    setselectedDate(value.getDate());
  }, [value]);

  return (
    <div className="myPage_container">
      <div className="myPage_item">
        <span style={{ width: "20px", height: "20px" }} key="upload">
          <ImageUploader />
        </span>
        <span> {currentUsername}의</span> to do list
      </div>
      <div className="myPage_item">
        달력
        <Calendar onChange={setvalue} value={value} />
      </div>
      <div className="myPage_item">
        <AchievementRate
          year={selectedYear}
          month={selectedMonth}
          today={selectedDate}
        />
      </div>
      <div className="myPage_item">
        <div>이달의 목표</div>
        <List
          category="이달의 목표"
          year={selectedYear}
          month={selectedMonth}
          today={selectedDate}
        />
      </div>
      <div className="myPage_item">
        <div>일상</div>
        <List
          category="일상"
          year={selectedYear}
          month={selectedMonth}
          today={selectedDate}
        />
      </div>
      <div className="myPage_item">
        <div>공부</div>
        <List
          category="공부"
          year={selectedYear}
          month={selectedMonth}
          today={selectedDate}
        />
      </div>
      <div className="myPage_item">
        <div>취미</div>
        <List
          category="취미"
          year={selectedYear}
          month={selectedMonth}
          today={selectedDate}
        />
      </div>
    </div>
  );
}

export default withRouter(MyPage);