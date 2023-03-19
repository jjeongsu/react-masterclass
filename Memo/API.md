# API가 뭔데?

api - application programming interface의 줄임말이다.
중요한 것은 API가 REST API, GraphQl API만을 의미하지 않는 다는 것이다.  
WEB API도 있고, 브라우저 API도 있다.
트위터도 있고, 아마존도 있다. 그러니까 훨씬더 넓은 개념이다.
  
Interface -> 무엇인가와 상호작용하는 방법이다. 리모콘 버튼처럼 사용자에게 노출되어 있어서 상호작용할 수 있게 도와주는 것이다. how? 텔레비전을 만든 사람들이 노출시킨 기능, 커맨드, 액션이니까. 그러니까 굳이 프로그래밍과 관련되어 있어야 한다는 것은 아니다.
api는 어플리케이션, 서버, 웹사이트를 만든 사람이 만들어서 내놓은 것이고, 사람들은 api로 상호작용 할 수 있다.

# REST가 뭔데?

- Rest API, GraphQl api의 차이는 이 버튼들이 노출되는 방법에 있다.  
해당 api의 데이터에 어떻게 접근할지, 서버에 접근할지
- Rest API -> URl을 통해 이루어진다.
ex) jademovies.co/api/movies 영화데이터를 받아오고 싶다.  
이런 url로 request를 만들면 JSON형식의 데이터를 줄것이다.
리소스나 리소스 목록을 얻을때 이런 URL을 사용한다......
jademovies웹사이트는 사람들이 이 URL을 요청하는 것을 허용해줘야 한다.
만약 movieId가 1인 영화를 얻고 싶다면
jademovies.co/api/movies/1  
만약 평점이 9점인 영화를 얻고 싶다면
jademovies.co/api/movies/search?rating=9  

REST는 뭐다? URL이다. 요청하면 데이터 get
이처럼 REST는 조직화 되어 있고 이해하기 쉽다. 

# REST + HTTP  

사실 API에 동사를 넣는 것은 좋은 방법이 아니다.
ex) 새로 만든다 -> create, add, upload..등 다양하기 때문  
때문에 HTTP메소드를 이용한다.
=> HTTP메소드 + URL  
DELETE/ GET/ POST/ FETCH ..  
