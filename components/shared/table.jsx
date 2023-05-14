import Image from "next/image";
import tw from "twin.macro";
const Table =tw.table`
w-[1300px]
//table-fixed
  text-base
  rounded-[20px]
drop-shadow-xl
overflow-hidden
  `;

const TableHead = tw.thead`
h-[60px]
text-white
bg-[#343A49]  
p-2
`;

const TableRow = tw.tr`
border-b-2
border-orange-400
`;

const TableHeader = tw.th`
p-2
`;

const TableBody = tw.tbody`
`;

const TableData = tw.td`
bg-white
text-[#343A49]
font-bold
border-b-2
border-[#D27842]
p-5
`;

const Button = tw.button`
  pl-4
  pr-4
  pt-2
  pb-2
  text-white
  rounded-lg
  bg-[#343A49]
 // hover:bg-green-200
  //transition-colors
`;

export function DataTable ({getTableProps,getTableBodyProps,headerGroups,rows,prepareRow,}){

return (

    <div className="">
       
        <Table {...getTableProps()}>
            <TableHead>
{
    headerGroups.map((headerGroup,)=>(
        <TableRow {...headerGroup.getHeaderGroupProps()}>
{
        headerGroup.headers.map((column)=>(
            <TableHeader{...column.getHeaderProps()}>
            {column.render("Header")}
            </TableHeader>
        ))     
}
        </TableRow>
    ))
}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
{
    rows.map(
        (row) => {
            prepareRow(row)
 
            return (
                <TableRow {...row.getRowProps()}>
                        {
                row.cells.map((cell, idx) => {
    if (cell.column.id === 'type_client' && cell.value === 'person') {
      return (
        <TableData {...cell.getCellProps()}>
          <div className="flex justify-center">
            <Image src="/icons/user.svg" width={40} height={40} />
          </div>
        </TableData>
      );
    } else if (cell.column.id === 'type_client' && cell.value === 'enterprise') {
return (
        <TableData {...cell.getCellProps()}>
          <div className="flex justify-center">
            <Image src="/icons/company.png" width={40} height={40} />
          </div>
        </TableData>
      );
    }
    else {
      return (
        <TableData {...cell.getCellProps()}>
          {cell.render('Cell')}
        </TableData>
      );
    }
  })}
                </TableRow>
            )
 
                    }
    )
}
            </TableBody>
        </Table>
 </div>
    )

}