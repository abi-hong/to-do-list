import React, { useEffect } from 'react'
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom'; //history 사용
import Column from 'antd/lib/table/Column';

function LandingPage(props) {

	useEffect(() => { 
		axios.get('/api/hello')
			.then(response => { console.log(response.data) })
	}, [])
    
    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh', flexDirection: 'Column'
        }}>
            <h2>시작 페이지</h2> 
            <br />
            <h4>To Do List 웹사이트에 오신 것을 환영합니다.</h4>
            <div style={{display: 'flex', justifyContent: 'space-between', width: '270px'}} >
                <button><Link to="/login">로그인 페이지로</Link></button>
                <button><Link to="/register">회원가입 페이지로</Link></button>
            </div>
        </div>
    )
}

export default withRouter(LandingPage)