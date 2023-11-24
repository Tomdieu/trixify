import Sidebar from "@/components/sidebar/Sidebar"

export default async function Home() {
  return (
    <div className="bg-white h-screen flex w-full">
      <div className="w-1.5/12">
      <Sidebar/>
        </div>
      <div className="w-10.5/12">
      <h1 className="text-5xl">Hello</h1>
        </div>
    </div>
  )
}
