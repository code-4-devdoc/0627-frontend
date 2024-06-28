import React from "react";
import './Auth.css'; // CSS 파일 연동
import { signup } from "../../service/ApiService";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // 회원가입 폼 제출 처리
  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");
    signup({ email: email, username: username, password: password }).then(
        (response) => {
          // 계정 생성 성공 시 login페이지로 리디렉트
          window.location.href = "/login";
        }
    );
  }

  render() {
    return (
        <div className="App">
          <div className="leftPanel">
            <h1 className="devDocTitle">Dev
              <div style={{marginTop: -30}}>Doc</div>
            </h1>
          </div>
          <div className="rightPanel">
            <div className="loginContainer">
              <h1 className="loginTitle">회원가입</h1>
              <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="닉네임"
                    required
                    className="textField"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="이메일 (예: example@gmail.com)"
                    required
                    className="textField"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="비밀번호"
                    required
                    className="textField"
                />
                <div className="buttonContainer">
                  <button type="submit" className="loginButton">계정 생성</button>
                </div>
              </form>
            </div>
          </div>
        </div>
    );
  }
}

export default SignUp;
