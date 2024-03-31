import React from 'react';
import * as Menubar from '@radix-ui/react-menubar';
// import { CheckIcon, ChevronRightIcon, DotFilledIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../hooks/ContextProvider';

// const RADIO_ITEMS = ['Andy', 'Benoît', 'Luis'];
// const CHECK_ITEMS = ['Always Show Bookmarks Bar', 'Always Show Full URLs'];

const MenubarDemo = ({ navigationHandler, type, menuTitle, menuBar, menuItems, genreId }) => {
  //   const [checkedSelection, setCheckedSelection] = React.useState([CHECK_ITEMS[1]]);
  //   const [radioSelection, setRadioSelection] = React.useState(RADIO_ITEMS[2]);
  const { setGenreType } = useGlobalContext();
  const menuItemValueHandler = (value, id) => {
    const genreFormat = value.toLowerCase().split(' ').join('-');
    setGenreType(id);
    navigationHandler(genreFormat);
  };
  return (
    <Menubar.Root className='flex p-[3px]'>
      <Menubar.Menu>
        {menuBar && (
          <Menubar.Trigger className='py-5 mx-3 outline-none select-none font-medium leading-none rounded text-white text-[15px] flex items-center justify-between gap-[2px]'>
            {menuTitle}
          </Menubar.Trigger>
        )}

        {menuItems && (
          <Menubar.Portal>
            <Menubar.Content
              className='min-w-[190px] grid grid-cols-2 z-50 bg-[rgba(184, 7, 7, 0.4)] ring-offset-white ring-1 backdrop-blur-md rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] [animation-duration:_400ms] [animation-timing-function:_cubic-bezier(0.16,_1,_0.3,_1)] will-change-[transform,opacity]'
              align='start'
              sideOffset={5}
              alignOffset={-3}>
              {menuItems?.map((item) => {
                genreId = item.id;
                return (
                  <Menubar.Item
                    onClick={() => menuItemValueHandler(item.name, item.id)}
                    key={item.id}
                    className='text-[13px] cursor-pointer leading-none text-white rounded flex items-center h-[25px] px-[10px] relative select-none outline-none data-[state=open]:bg-violet4 data-[state=open]:text-violet11 data-[highlighted]:bg-gradient-to-br data-[highlighted]:from-violet9 data-[highlighted]:to-violet10 data-[highlighted]:text-violet1 data-[highlighted]:data-[state=open]:text-violet1 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none'>
                    {item?.name}
                  </Menubar.Item>
                );
              })}
            </Menubar.Content>
          </Menubar.Portal>
        )}
      </Menubar.Menu>

      {!menuBar && (
        <Menubar.Menu>
          <Menubar.Trigger
            onClick={() => navigationHandler(type)}
            className='py-5 mx-3 outline-none select-none font-medium leading-none rounded text-white text-[15px] flex items-center justify-between gap-[2px]'>
            {menuTitle}
          </Menubar.Trigger>
        </Menubar.Menu>
      )}
    </Menubar.Root>
  );
};

export default MenubarDemo;
