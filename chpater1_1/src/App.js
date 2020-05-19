import React from 'react';
import ReactDOM from 'react-dom';

let values = []; //定义组件需要的临时状态数组，使用全局变量，避免在组件渲染的时候状态又变回初始值
let currentHook = 0; //由于会有多个数据状态，所以必须有个变量标识当前数据状态的下标

function useState(initialState) {
  if (typeof values[currentHook] === 'undefined')
    //如果在状态数组中没有找到当前下标的状态值的时候就用初始值， 可以避免在每次组件重新渲染的时候都使用初始值
    values[currentHook] = initialState;

  let hookIndex = currentHook; //把当前状态下标赋值给闭包中的一个变量

  function setState(nextValue) {
    values[hookIndex] = nextValue; //组件中onChange的时候通过闭包里的hookInidex来更新这个状态值
    /* We are going to need  ReactDOM in order to force rerendering of the component in our
reimplementation of the  useState Hook(ReactDOM强制重新渲染组件) */
    ReactDOM.render(<MyName />, document.getElementById('root'));
  }
  /* If we wanted to first increment a value and then use it, we could use the
arr[++indexToBeIncremented] syntax, which first increments, and then passes the result to
the array */
  /* values[currentHook++] 执行步骤是首先返回values[currentHook], 然后让currentHook自增1 */
  return [values[currentHook++], setState];
}

function MyName() {
  currentHook = 0; //每次组件重新渲染就把全局下标置位0
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');

  function handleChange(evt) {
    setName(evt.target.value);
  }
  function handleLastNameChange(evt) {
    setLastName(evt.target.value);
  }

  return (
    <div>
      <h1>
        My name is: {name} {lastName}
      </h1>
      <input type="text" value={name} onChange={handleChange} />
      <input type="text" value={lastName} onChange={handleLastNameChange} />
    </div>
  );
}

export default MyName;
