import Image from "next/image";
import { PUBLIC_URL } from "../../../config/api";
import { useState } from "react";

export function DataTable({
  getTableProps,
  getTableBodyProps,
  headerGroups,
  rows,
  prepareRow,
}) {
  return (
    <div className="w-full">
      <table
        {...getTableProps()}
        className="w-full text-base rounded drop-shadow-xl overflow-hidden p-2 "
      >
        <thead className="py-4 text-white bg-[#343A49] border-2 border-dark-grey">
          {headerGroups.map((headerGroup, index) => (
            <tr className="" key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                if (column.id !== "id_annonceur") {
                  return (
                    <th
                      className="p-2"
                      key={column.render("Header")}
                      {...column.getHeaderProps()}
                    >
                      {column.render("Header")}
                    </th>
                  );
                }
                return null;
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);

            return (
              <tr
                {...row.getRowProps()}
                key={index}
                className="h-[80px] bg-white border-2 border-dark-grey"
              >
                {row.cells.map((cell, idx) => {
                  if (cell.column.id === "path_annonceur") {
                    return (
                      <td
                        key={idx}
                        className="relative flex justify-center h-full p-3 font-bold bg-white"
                      >
                        <div className="w-14 h-14 rounded-full overflow-hidden">
                          <img
                            src={`${PUBLIC_URL}${cell.value}`}
                            alt="Avatar"
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                      </td>
                    );
                  } else if (
                    cell.column.id === "type_annonceur" &&
                    cell.value === "Personne"
                  ) {
                    return (
                      <td
                        key={idx}
                        className="flex justify-center p-2 font-bold bg-white"
                      >
                        <Image
                          src="/icons/man 2.svg"
                          width={40}
                          height={40}
                          alt="men"
                        />
                      </td>
                    );
                  } else if (
                    cell.column.id === "type_annonceur" &&
                    cell.value === "Enterprise"
                  ) {
                    return (
                      <td
                        key={idx}
                        className="flex justify-center p-2 font-bold bg-white"
                      >
                        <Image
                          src="/icons/office 2.svg"
                          width={40}
                          height={40}
                          alt="office"
                        />
                      </td>
                    );
                  } else if (cell.column.id === "id_client" && !cell.value) {
                    return (
                      <td key={idx} className="p-2 font-bold text-[#343A49]">
                        Pas de propriétaire
                      </td>
                    );
                  } else if (cell.column.id === "distributeurs") {
                    return (
                      <td key={idx} className="p-2 font-bold text-[#343A49]">
                        {cell.value[0] ? cell.value[0].distributor_count : 0}
                      </td>
                    );
                  } else if (
                    cell.column.id === "type_client" &&
                    cell.value === "individual"
                  ) {
                    return (
                      <td key={idx}>
                        <div className="flex justify-center">
                          <Image src="/icons/user.svg" width={40} height={40} />
                        </div>
                      </td>
                    );
                  } else if (
                    cell.column.id === "type_client" &&
                    cell.value === "enterprise"
                  ) {
                    return (
                      <td key={idx}>
                        <div className="flex justify-center">
                          <Image
                            src="/icons/company.png"
                            width={40}
                            height={40}
                          />
                        </div>
                      </td>
                    );
                  } else if (cell.column.id !== "id_annonceur") {
                    return (
                      <td
                        className="bg-white text-[#343A49] font-bold p-2"
                        key={idx}
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  }
                  return null;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
