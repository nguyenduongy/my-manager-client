import { useLayoutEffect,useState } from 'react';


export default function useWindowPositon(id){

    const [animation,setAnimation] = useState(false);

    useLayoutEffect (() => {
        function updatePositon(){
        
              const offetSetHeight = window.document.getElementById(id).offsetHeight;
              
              if (window.pageYOffset > offetSetHeight *0.7)
              {

                setAnimation(true);
              }
            }
            window.addEventListener('scroll', updatePositon );
            updatePositon();

              return () => window.removeEventListener('scroll', updatePositon);

    },[id]);
    return animation;
}