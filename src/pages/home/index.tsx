export function Home() {    
    return (
        <div className="flex flex-col w-full items-center justify-center h-screen p-2">
            {/* <div className="w-full bg-gray-300 absolute h-1/3 top-0"></div> */}
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="avatar w-32 h-32 rounded-full bg-gray-300 z-10 overflow-hidden">
                    <img className="rounded-full" src="https://avatars.githubusercontent.com/u/10318700?v=4" alt="Avatar" /> 
                </div>
                <h1 className="md:text-4xl text-3xl font-black">@marcostv</h1>
                <p className="text-lg text-gray-900 text-base text-center">Veja meus trabalhos e descubra como posso ajudar você. 🚀​</p>
            </div>

            <main className="flex flex-col items-center justify-center gap-4 mt-8 w-full max-w-md"> 
                <section>
                   <a href="https://github.com/marcostv" className="block w-full text-center bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">Website</a>
                </section>

                 <section>
                   <a href="https://www.linkedin.com/in/marcostv" className="block w-full text-center bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">Portfolio</a>
                </section>

                <section>
                   <a href="https://github.com/marcostv" className="block w-full text-center bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">GitHub</a>
                </section>

                <section>
                   <a href="https://github.com/marcostv" className="block w-full text-center bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">Instagram</a>
                </section>

                <section>
                   <a href="https://github.com/marcostv" className="block w-full text-center bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">Whatsapp</a>
                </section>

            </main>

        </div>
    )
}