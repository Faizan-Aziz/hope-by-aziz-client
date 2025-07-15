
interface ReportCardProps {
  title: any;
  value: any;
  showCurrency?: boolean;
}

const ReportCard = ({ title, value, showCurrency = false }: ReportCardProps)   => {
  return (
    <div className='border-2 border-[rgb(26,54,54)] border-solid rounded-sm  p-2 bg-gray-100 flex flex-col gap-7 p-5'>

    <h1 className='text-lg font-[900] text-center text-[rgb(26,54,54)]'> {title} </h1>

    <h1 className='text-5xl text-center font-[600] text-[rgb(26,54,54)]'>
      {showCurrency && "$"}
      {value} 
    </h1>

    


    </div>
  )
}
 
export default ReportCard