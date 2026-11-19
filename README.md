# 3Y CORPORATION 사이트 설정

## 오디션 신청 이메일 연동

오디션 폼은 EmailJS를 통해 브라우저에서 이메일을 전송합니다. 서버를 별도로 운영하지 않아도 되지만, 먼저 EmailJS 계정과 이메일 템플릿을 설정해야 실제 메일을 받을 수 있습니다.

### 1. EmailJS 서비스 연결

1. [EmailJS](https://www.emailjs.com/) 계정을 만들고 대시보드에 로그인합니다.
2. **Email Services**에서 이메일 서비스를 추가하고 본인의 이메일 계정에 연결합니다.
3. **Email Templates**에서 새 템플릿을 만듭니다.
4. 템플릿의 **To Email**에는 메일을 받을 본인의 주소를 직접 입력합니다.
5. 템플릿 본문은 폼 필드명과 같은 변수를 사용합니다. 예:

   ```text
   이름: {{name}}
   나이: {{age}}
   지원자 이메일: {{email}}
   ```

6. 템플릿의 **Reply-To**에는 `{{email}}`을 입력하면 지원자에게 답장할 때 편리합니다.
7. 프로필 파일도 받으려면 템플릿의 **Attachments** 탭에서 **Form File Attachment**를 추가하고 **Parameter Name**을 `profile`로 지정합니다. 폼의 파일 입력 이름과 일치해야 합니다.

### 2. 프로젝트에 키와 ID 입력

EmailJS 대시보드에서 다음 값을 확인합니다.

- **Public Key**: Account 페이지
- **Service ID**: 연결한 Email Service
- **Template ID**: 만든 Email Template

[js/audition.js](./js/audition.js) 상단의 설정값을 본인의 값으로 바꿉니다.

```js
const config = {
  publicKey: "YOUR_PUBLIC_KEY",
  serviceId: "YOUR_SERVICE_ID",
  templateId: "YOUR_TEMPLATE_ID",
};
```

### 3. 실행 및 테스트

`audition.html`을 웹 서버나 정적 호스팅으로 열고, 테스트 신청서를 제출합니다. 이메일 전송은 브라우저에서 EmailJS CDN에 연결할 수 있어야 작동합니다. `file://`로 직접 여는 대신 VS Code의 Live Server 같은 로컬 웹 서버를 사용하세요.

전송 성공/실패 메시지는 신청 폼 아래에 표시됩니다. 실패하면 브라우저 개발자 도구의 Console에서 EmailJS 오류를 확인하세요.

### 보안 및 첨부 파일 참고

- 브라우저에서 쓰는 **Public Key**는 사용자에게 노출됩니다. 여기에 이메일 비밀번호, SMTP 비밀번호, 비공개 키를 넣지 마세요.
- EmailJS 대시보드에서 허용 도메인을 설정하고, 공개 배포 전 스팸 방지 및 EmailJS 사용량 제한을 확인하세요.
- `profile` 첨부는 선택 사항이며 PDF/JPG/PNG 파일 입력을 사용합니다. 실제 첨부 메일을 받으려면 템플릿의 **Form File Attachment** 설정이 필요하고, 파일 크기는 EmailJS 및 이메일 제공자의 제한을 따릅니다.
