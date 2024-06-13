/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef } from 'react';
import { CustomCellRendererProps } from 'ag-grid-react';
import grabby from '@/assets/grabby.png';
import { Checkbox } from '@radix-ui/themes';
// import { Checkbox, IconButton, Tooltip } from '@radix-ui/themes';
// import { RiExpandDiagonalFill } from 'react-icons/ri';
export default function PrimarySelectCell(props: CustomCellRendererProps) {
  // console.log(params )
  // const [isHovered, setIsHovered] = useState(false)
  const myRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    props.registerRowDragger(myRef.current!);

    // console.log(props.api.getRowNode('1')?.isHovered())
    // console.log(props.node.isHovered())
    // console.log(props.node.isSelected())
  });
  // console.log(props.node.lastChild)
  if (props.node.lastChild) {
    // props.fullWidth
    // props.api.setcell
  }
  // const upcomingFeature = <>
  //   <div className="h-6 w-1.5 rounded-radius_3 bg-accent-10">&nbsp;</div>
  //   <Tooltip content="Expand" side="bottom">
  //     <IconButton
  //       className="absolute right-1.5 cursor-pointer"
  //       size="1"
  //       variant="ghost"
  //       radius="full"
  //     >
  //       <RiExpandDiagonalFill size={15} />
  //     </IconButton>
  //   </Tooltip>
  // </>

  return (
    <>
      <div ref={containerRef} className="relative !m-0 flex w-full items-center gap-2 !p-0">
        <img ref={myRef} src={grabby.src} alt="Grabby" className="cursor-grab" />
        <Checkbox />
        <span className="p-0 text-xs">{props.node.childIndex + 1} </span>
      </div>
      {/* {
        props.node.lastChild && <div className='bg-orange-300 w-10 h-10 absolute '>Add row </div>
      } */}
    </>
  );
}
