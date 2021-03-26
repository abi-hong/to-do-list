import React from "react";
import axios from "axios";
import MainList from "./MainList";
import "./MainPage.css";

class MainPage extends React.Component {
  state = {
    isLoading: true,
    category: "전체",
    lists: []
  };
  getLists = async () => {
    const { category } = this.state;
    
    let body = {
      category, 
    };
    const response = await axios.post("", body);
    this.setState({ lists: response.lists, isLoading: false });
  };
  componentDidMount() {
    this.getLists();
  }
  /*componentDidUpdate(prevProps, prevState) {
    if (prevState.category !== this.state.category)
      this.getLists(); 
  }

  changeToAll = () => {
    this.setState({category: "전체"});
  }
  changeToDaily = () => {
    this.setState({category: "일상"});
  }
  changeToStudy = () => {
    this.setState({category: "공부"});
  }
  changeToHobby = () => {
    this.setState({category: "취미"});
  }*/

  render() {
    const { isLoading, lists } = this.state;
    return (
      <>
        {/*
        <button onClick={this.changeToAll}>전체</button>
        <button onClick={this.changeToDaily}>일상</button>
        <button onClick={this.changeToStudy}>공부</button>
    <button onClick={this.changeToHobby}>취미</button>*/}
        <section className="container">  
          {isLoading ? (
            <div className="loader">
              <span className="loader__text">Loading...</span>
            </div>
          ) : (
            <div className="lists">
              {lists.map(list => (
                <MainList
                  key={list.id}
                  id={list.id}
                  userImg={list.userImg}
                  userName={list.userName}
                  mainCategory={list.mainCategory}
                />
              ))}
            </div>
          )}
        </section>
      </>
    );
  }
}

export default MainPage;
