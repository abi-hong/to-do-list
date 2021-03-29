import React from "react";
import axios from "axios";
import "../MainPage.css";
import DailyList from "./dailyList";

class dailyPage extends React.Component {
  state = {
    isLoading: true,
    category: "일상",
    users: []
  };
  getLists = async () => {
    const { category } = this.state;
    
    let body = {
      category, 
    };
    const response = await axios.post("api/main/getMain", body);
    console.log(response);
    this.setState({ 
      users: response.data.user,
      isLoading: false,
    });

  };
  componentDidMount() {
    this.getLists();
  }
  
  render() {
    const { isLoading, users } = this.state;
    return (
      <>
        <section className="container">  
          {isLoading ? (
            <div className="loader">
              <span className="loader__text">Loading...</span>
            </div>
          ) : (
            <div className="lists">
              {users.map(user => (
                <DailyList
                  key={user.ID}
                  id={user.ID}
                  userImg={user.image}
                  userName={user.name}
                  mainCategory={user.mostList}
                />
              ))}
            </div>
          )}
        </section>
      </>
    );
  }
}

export default dailyPage;
