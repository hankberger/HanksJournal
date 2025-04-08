import { useEffect } from 'react';
import { animate, utils } from 'animejs';

const ClockComponent = () => {
  useEffect(() => {
    // Select the DOM elements using Anime.js utilities
    const [ $clock ] = utils.$('.clock');
    const [ $add ] = utils.$('.add');
    const [ $sub ] = utils.$('.sub');
    const [ $mul ] = utils.$('.mul');

    // Define the animation functions
    const add = () => animate($clock, { rotate: '+=90' });
    const sub = () => animate($clock, { rotate: '-=90' });
    const mul = () => animate($clock, { rotate: '*=.5' });

    // Add event listeners to the buttons
    $add.addEventListener('click', add);
    $sub.addEventListener('click', sub);
    $mul.addEventListener('click', mul);

    // Cleanup function to remove event listeners on unmount
    return () => {
      $add.removeEventListener('click', add);
      $sub.removeEventListener('click', sub);
      $mul.removeEventListener('click', mul);
    };
  }, []);

  return (
    <div>
      <div className="clock">Clock</div>
      <button className="add">Add</button>
      <button className="sub">Subtract</button>
      <button className="mul">Multiply</button>
    </div>
  );
};

export default ClockComponent;
