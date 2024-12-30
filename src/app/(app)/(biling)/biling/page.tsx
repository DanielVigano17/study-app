"use client"
export default function Page() {
    const handleSubmit = async (e : any) =>{
        e.preventDefault();
        const data = await fetch('http://localhost:3000/api/payment/checkout',{
            method: 'post'
        })
        const url = await data.json()
        window.location.href = url;
    }
  return (
    <div>
     <form onSubmit={handleSubmit} method="POST">
      <section>
        <button type="submit" role="link">
          Checkout
        </button>
      </section>
    </form>
    </div>
  )
}
