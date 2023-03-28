# Loop the object

투두리스트에는 3가지 보드가 존재한다. todo, doing, done.  
trello를 만들면서 3가지 보드에 있는 todos들을 보드별로 움직일 필요가 있었다.
그래서 atom에 
```
  const todos = {
    to_do:["a","b",],
    doing:["c","d"],
    done:["e","f"],
  },
```  
위처럼 생긴 객체를 통해 요소들을 관리하려고 한다.

- Object.keys(todos) : object가 가진 key만 array롤 뽑아준다.
- Object.values(todos) : object가 가진 value만 array를 뽑아준다.
- 특정 key가 가진 값들만 뽑으려면? todos['doing']
 => 객체 전체를 순회하면서 키당, value를 뽑으려면? Object.keys(todos).map(boardId => todos[boardId])