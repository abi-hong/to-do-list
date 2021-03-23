import React, { Component } from "react";
import TodoListTemplate from "./TodoListTemplate";
import Form from "./Form";
import TodoItemList from "./TodoItemList";
import axios from "axios";
//화면 시작될 때 todolist 정보 받아와서 출력.

//localStorage로부터 login할때 저장한 userId 가져오기
const currentUserId = localStorage.getItem("userId");

class List extends Component {
  id = 0; // id 0으로 초기화.

  state = {
    input: "",
    writer: { _id: currentUserId },
    category: this.props.category,
    todos: [],
  };

  GetFromServer = () => {
    const { writer, category } = this.state;

    let body = {
      writer: writer,
      category: category,
      year: this.props.year,
      month: this.props.month,
      today: this.props.today,
    };
    axios.post("/api/list/getList", body)
      .then((response) => {
        if (response.data.success === true) {
          for (let i = 0; i < response.data.list.todos.length; i++) {
            this.setState({ todos: response.data.list.todos });
          }
          this.id = response.data.listCount;
        } /*else {
          alert('list 정보를 가져오는 것을 실패 하였습니다.');
        }*/
      });
    //화면 렌더링할때 저장된 list 그대로 출력.  
  }

  componentDidMount() {
    this.GetFromServer();
  }




  //server로 정보 전송하는 함수 - (새로 생성할 때 & 체크 & 지우기 & 공개 설정) 후에 동작
  PostToServer = () => {
    const { writer, category, todos } = this.state;

    //console.log({writer, category, todos });

    let body = {
      writer: writer,
      category: category,
      todos: todos,
    };
    axios.post("/api/list/saveList", body)
      .then((response) => {
        console.log(response.data);
      });
  };

  handleChange = (e) => {
    this.setState({
      input: e.target.value, // input 의 다음 바뀔 값
    });
  };

  // listitem 생성하는 함수.
  handleCreate = () => {
    const { input, todos } = this.state;

    this.setState(
      {
        input: "", // 인풋 비우고
        // concat 을 사용하여 배열에 추가
        todos: todos.concat({
          id: this.id++,
          text: input,
          year: this.props.year,
          month: this.props.month,
          today: this.props.today,
          category: this.props.category,
          checked: false,
          privated: true,
        }),
      },
      function () {
        this.PostToServer();
      }
    );
  };

  handleKeyPress = (e) => {
    // 눌려진 키가 Enter 면 handleCreate 호출
    if (e.key === "Enter") {
      this.handleCreate();
    }
  };

  // 체크하기/체크풀기
  handleToggle = (id) => {
    const { todos } = this.state;

    // 파라미터로 받은 id 를 가지고 몇번째 아이템인지 찾습니다.
    const index = todos.findIndex((todo) => todo.id === id);
    const selected = todos[index]; // 선택한 객체

    const nextTodos = [...todos]; // 배열을 복사

    // 기존의 값들을 복사하고, checked 값을 덮어쓰기
    nextTodos[index] = {
      ...selected,
      checked: !selected.checked,
    };

    this.setState(
      {
        todos: nextTodos,
      },
      function () {
        this.PostToServer();
      }
    );
  };

  //아이템 제거하기
  handleRemove = (id) => {
    const { todos } = this.state;

    this.setState(
      {
        todos: todos.filter((todo) => todo.id !== id),
      },
      function () {
        for (let i = id + 1; i < todos.length; i++) {
          todos[i].id -= 1;
        }
        this.PostToServer();
      }
    );
  };

  //아이템 공개 비공개 처리
  handlePrivate = (id) => {
    const { todos } = this.state;

    // 파라미터로 받은 id 를 가지고 몇번째 아이템인지 찾습니다.
    const index = todos.findIndex((todo) => todo.id === id);
    const selected = todos[index]; // 선택한 객체

    const nextTodos = [...todos]; // 배열을 복사

    // 기존의 값들을 복사하고, private 값을 덮어쓰기
    nextTodos[index] = {
      ...selected,
      privated: !selected.privated,
    };

    this.setState(
      {
        todos: nextTodos,
      },
      function () {
        this.PostToServer();

        //console.log(this.state.todos);
        // private 출력 바꾸기.
      }
    );
  };

  render() {
    const { input, todos } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove,
      handlePrivate,
    } = this;

    return (
      <TodoListTemplate
        form={
          <Form
            value={input}
            onKeyPress={handleKeyPress}
            onChange={handleChange}
            onCreate={handleCreate}
          />
        }
      >
        <TodoItemList
          todos={todos}
          onToggle={handleToggle}
          onRemove={handleRemove}
          onPrivate={handlePrivate}
        />
      </TodoListTemplate>
    );
  }
}

export default List;
