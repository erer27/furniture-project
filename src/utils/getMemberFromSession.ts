export default function getMemberFromSession() {
  const memberJSONstring = window.sessionStorage.getItem("member");
  const member = JSON.parse(
    memberJSONstring ? memberJSONstring : JSON.stringify({ id: null })
  );

  return member;
}
