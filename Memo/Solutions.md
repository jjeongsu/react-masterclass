# 에러와 해결방법, 시도를 정리한 문서 입니다.

1. useParams사용, 키워드 undefined 문제

해결방법 : useParams로 불러올 키워드 설정과 라우터주소의 키워드 경로의 이름을 맞춰줌

이전
```
{
		path:"/:coinID", //대문자로 되어있었음
		element: <Coin />,
		children: (생략)
}
```

이후
```
{ //Router.tsx에서
		path:"/:coinId", 
		element: <Coin />,
		children: (생략)
}
```
Coin.tsx에서
```
const {coinId} = useParams() as {coinId: string};  
```
이렇게 불러와 준다.

단순 오타때문에 한참을 해맸다,,ㅠㅠ


