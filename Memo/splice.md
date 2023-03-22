## splice를 사용하여 배열 조작하기

6개의 알파벳을 담은 배열이 있다.  
x = ["a", "b", "c", "d", "e","f"]  

splice를 이용하여 배열의 특정 요소를 삭제하고, 다른 위치에 삽입하해 보자.

### 삭제
x.splice(index, 1);  
index위치에 있는 요소하나를 삭제한다. 1은  index 위치로부터 몇개의 요소를 삭제할지를 결정한다.  

### 추가
x.splice(index, 0, element);  
index위치에 요소 element를 추가한다. 

중요한 점은 splice자체가 원본배열을 직접 조작한다는 점이다.

### Drag and drop 보드에서 요소의 위치를 변경하기

디폴드 배열은 recoil에 담겨 있으며, useRecoilState를 이용해 atom의 배열을 조작한다.
