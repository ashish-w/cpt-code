import { useState } from 'react';
import { Tabs } from 'antd';
import PostsCarousel from "../PostsCarousel/PostsCarousel";

const TabsComponent = () => {
  const [keys, setKey] = useState('1');
  const [category, setCategory] = useState('tours');

  const onChange = (key) => {
    setKey(key);
    switch (key) {
      case '1': return setCategory('tours');
      case '2': return setCategory('events');
      case '3': return setCategory('things-to-do');
    }
  };

  return (

    <Tabs
      defaultActiveKey="1"
      onChange={onChange}
      centered
      items={[
        {
          label: <button className={`btn-tab ${keys === '1' ? 'active-tab' : ''} text-uppercase`}>Recent</button>,
          key: '1',
          children: <PostsCarousel category={category} />,
        },
        {
          label: <button className={`btn-tab ${keys === '2' ? 'active-tab' : ''} text-uppercase`}>Events</button>,
          key: '2',
          children: <PostsCarousel category={category} />,
        },
        {
          label: <button className={`btn-tab ${keys === '3' ? 'active-tab' : ''} text-uppercase`}>Things to do</button>,
          key: '3',
          children: <PostsCarousel category={category} />,
        },
      ]}
    />
  );
}

export default TabsComponent


// const TabsComponent = ({ postsData }) => {

//   const [keys, setKey] = useState('1');

//   const onChange = (key) => {
//     setKey(key);
//   };

//   return (

//     <Tabs
//       defaultActiveKey="1"
//       onChange={onChange}
//       centered
//       items={[
//         {
//           label: <button className={`btn-tab ${keys === '1' ? 'active-tab' : ''} text-uppercase`}>Recent</button>,
//           key: '1',
//           children: <PostsCarousel postsData={postsData[0].posts} />,
//         },
//         {
//           label: <button className={`btn-tab ${keys === '2' ? 'active-tab' : ''} text-uppercase`}>Events</button>,
//           key: '2',
//           children: <PostsCarousel postsData={postsData[1].posts} />,
//         },
//         {
//           label: <button className={`btn-tab ${keys === '3' ? 'active-tab' : ''} text-uppercase`}>Things to do</button>,
//           key: '3',
//           children: <PostsCarousel postsData={postsData[2].posts} />,
//         },
//       ]}
//     />
//   );
// }
