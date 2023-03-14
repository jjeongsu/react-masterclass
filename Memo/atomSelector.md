# Selector

recoil에서 제공하는 기능중의 하나인 selector에 대해서 알아보자.


지난 시간에 todolist의 카테고리를 변경하면 atom에 새로운 state를 반환해주는 기능에 대해서 배워보았다.
지금까지는 todoState에 카테고리에 관계없이 모든 todo들을 저장해 왔다.
그런데 만약 카테고리별로(Todo, Doing, Done) state를 나누어 저장하고 싶다면?

이럴때 selector를 이용해 카테고리별로 state를 조작해 보자.
(selector를 이용해 atom의 ouput을 조작한다는 얘기다.)


