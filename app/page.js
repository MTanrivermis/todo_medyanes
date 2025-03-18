import Form from "@/components/Form";
import Header from "@/components/Header";
import ListTodos from "@/components/ListTodos";

export default function Home() {
  return (
    <div className="mx-[5%] md:mx-[15%]">
      <Header />
      <Form />
      <ListTodos />
    </div>
  );
}
