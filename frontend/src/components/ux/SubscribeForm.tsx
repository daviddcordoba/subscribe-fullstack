import { FaTelegramPlane } from "react-icons/fa";
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast"

const userEmailSchema = z.object({
    email: z
        .string()
        .email({message:"El email no es válido"})
})

const SubscribeForm = () => {
    const { toast } = useToast()
    const [isLoading,setIsLoading] = useState(false)
    const [subscriptionCount, setSubscriptionCount] = useState(0);

    const form = useForm({
        resolver:zodResolver(userEmailSchema),
        defaultValues:{
            email:""
        }
    })
    const fetchSubscriptionCount = async () => {
      try {
        const response = await fetch("http://localhost:5000/");
        const data = await response.json();
        if (response.ok) {
            setSubscriptionCount(data.count);
        } else {
            console.log(data.error || "Error al obtener el contador.");
        }
      } catch (error) {
        console.error("Error al obtener el contador de suscripciones:", error);
        
    }
    };
    useEffect(() => {
    
        fetchSubscriptionCount();
      }, []);

    const onSubmit = form.handleSubmit(async values => {
        setIsLoading(true);
        try {
          const response = await fetch('http://localhost:5000', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: values.email
            }),
          });

          const data = await response.json();
            if (response.ok) {
                toast({
                    title:"¡Suscripción exitosa! Revisa tu correo.",
                    className: "bg-gray-400 text-black"
                  })
                  fetchSubscriptionCount()
            } else {
                toast({
                    title: "Algo salió mal.",
                    description: data.error,
                    className: "bg-red-600 text-white"
                  })
            }

            form.reset();
        }  catch (error) {
            toast({
                className: "bg-red-600 text-white",
                title: "Hubo un problema al procesar la suscripción. Intenta nuevamente.",
            })
        }  finally{
          setIsLoading(false)
        }
    })

return (
      <div className="py-10 px-6 sm:py-16 sm:px-12 md:py-20 md:px-24 lg:px-36 xl:px-44 gap-8 bg-white rounded-2xl shadow-md flex flex-col items-center max-w-[90%] w-full md:w-[750px] lg:w-[841px] h-auto">
    <div>
        <FaTelegramPlane 
            className="text-black w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
        />
    </div>

    <h1 className="text-black text-xl sm:text-2xl font-bold text-center leading-tight">
        SUBSCRIBE
    </h1>

    <Form {...form}>
        <form className="flex flex-col gap-y-4 text-black w-full">
            <FormField
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="text-sm sm:text-base">Ingresa tu email</FormLabel>
                        <FormControl>
                            <Input 
                                className="w-full h-10 px-4 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                type="email" 
                                {...field} 
                            />
                        </FormControl>
                        {form.formState.errors?.email && (
                            <FormDescription className="text-sm text-red-500">
                                {form.formState.errors?.email.message ?? ""}
                            </FormDescription>
                        )}
                    </FormItem>
                )}
            />
        </form>
    </Form>

    {isLoading ? (
        <Button disabled className=" flex items-center rounded-2xl  justify-center gap-2 w-full sm:w-auto h-10 px-6 bg-gray-300 text-gray-700 cursor-not-allowed">
            <Loader2 className="animate-spin" />
            Espere, por favor.
        </Button>
    ) : (
        <Button 
            onClick={onSubmit} 
            className="w-full rounded-2xl sm:w-auto h-10 px-6 bg-[#E6FC15] text-black text-sm font-bold hover:text-gray-500 hover:bg-[#E3F08E]"
        >
            SUBSCRIBE
        </Button>
    )}

    <div className="mt-4 text-black">
        <h2 className="text-center text-sm sm:text-base">Contador de suscripciones: {subscriptionCount || 0}</h2>
    </div>
</div>
    )
}

export default SubscribeForm