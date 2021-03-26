import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './AchievementRate.css';

// 선택된 year, month, today 전송 -> month의 전체 list 수 & 그중 checked 된 것의 개수 받아오기
//                               -> today의 전체 list 수 $ 그중 checked 된 것의 개수 받아오기
// (checked 된 것 / 전체 list) * 100 = 달성률(%)
//계산해서 화면에 출력.

function AchievementRate({ year, month, today }) {
    const [monthRate, setMonthRate] = useState(0);
    const [todayRate, setTodayRate] = useState(0);
    const [allMonthList, setallMonthList] = useState(0);
    const [allTodayList, setallTodayList] = useState(0);
    const [checkedMonthList, setcheckedMonthList] = useState(0);
    const [checkedTodayList, setcheckedTodayList] = useState(0);
    const currentUserId = localStorage.getItem("userId");
    // myPage 리로드 시 / list 추가될때 / list 삭제될때 / checked 될때 / checked 해제될때
    // axios.post 
    // => moonthRate와 todayRate 다시 계산해서 화면에 출력해야함.

    useEffect(() => {
        calculateRate();
    })

    function calculateRate() {
        //server에 선택된 년,월,일 정보 보내기
        let body = {
            writer: currentUserId,
            year: year,
            month: month,
            today: today
        }
        //console.log(body);

        axios.post('/api/list/getSuccess', body)
            .then((response) => {
                //server로부터 list개수 Checked된 개수 받아와서 state값 변경.
                //console.log(response.data);
                setallMonthList(response.data.monthTotal);
                setallTodayList(response.data.todayTotal);
                setcheckedMonthList(response.data.monthDone);
                setcheckedTodayList(response.data.todayDone);
            })
        //달성률 계산 & state 변경.
            if(allMonthList === 0) setMonthRate(0);
            else setMonthRate(Math.round((checkedMonthList / allMonthList) * 100));
            if(allTodayList === 0) setTodayRate(0);
            else setTodayRate(Math.round((checkedTodayList / allTodayList) * 100));  
            
                   
    }

    return (
        <>
            <div>
                {year}/{month}/{today}
                <button onClick={calculateRate}>update</button>
            </div>
            <div className="achievement_form">
                <div className="achievement_month">
                    <div className="rate_title">이달의 달성률</div>
                    <div className="rate">{monthRate}%</div>
                </div>
                <div className="achievement_today">
                    <div className="rate_title">오늘의 달성률</div>
                    <div className="rate">{todayRate}%</div>
                </div>
            </div>
        </>
    )
}

export default AchievementRate

