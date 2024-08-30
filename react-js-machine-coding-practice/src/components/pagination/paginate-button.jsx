
const Paginate = ({page,setPage,totalPages,maxButtons = 10})=>{
   
    const handlePage = (selectedPage) =>{
        if(typeof selectedPage !== 'number')return;
        if(selectedPage >= 0 && selectedPage < totalPages && selectedPage !== page)setPage(selectedPage);
    }
    const getPaginationItem = (curPage,key)=>{
        return <button key={key} onClick={()=>handlePage(curPage)}>{curPage}</button>
    }
    const renderPageButtons = ()=>{
        let pageItems = [];
        if(totalPages <= maxButtons){
            for(let i = 0;i<totalPages;i++){
                pageItems.push(getPaginationItem(i+1,i));
            }
        }else{
            let startPage = Math.max(0,page - Math.floor(maxButtons/2));
            let endPage = Math.min(totalPages,startPage + maxButtons - 1);
            if(startPage > 1){
                if(startPage > 2){
                    pageItems.push(getPaginationItem(1,0));
                }
                pageItems.push(getPaginationItem('...','current_page'));
            }
            for(let i = startPage;i<endPage;i++){
                pageItems.push(getPaginationItem(i+1,i));
            }
            if(endPage < totalPages){
                pageItems.push(getPaginationItem('...','end_page'));
                if(endPage < totalPages-1){
                    pageItems.push(getPaginationItem(totalPages,totalPages-1));
                }
            }
        }
        return pageItems;
    }
    return <div>
        <button onClick={()=>handlePage(page-1)}>Prev</button>
        {renderPageButtons()}
        <button onClick={()=>handlePage(page+1)}>Next</button>
    </div>
}

export default Paginate;