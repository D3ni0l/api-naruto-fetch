import { useEffect, useState } from "react"; // hooks do react
import "./Principal.css"; // importa o css do componente

export default function Principal() {
  // estados para armazenar os personagens e o status de carregamento
  const [data, setData] = useState({ characters: [] });
  const [loading, setLoading] = useState(true);

  // executa uma vez quando o componente carrega
  useEffect(() => {
    async function carregarPersonagens() {
      try {
        // faz a requisição para a api
        const response = await fetch("https://dattebayo-api.onrender.com/characters");
        if (!response.ok) {
          throw new Error("erro ao buscar os dados");
        }

        // transforma a resposta em json
        const result = await response.json();

        // mostra no console o que foi recebido
        console.log("dados recebidos:", result);

        // salva os dados no estado
        setData(result);
      } catch (error) {
        console.error("erro ao carregar personagens:", error);
      } finally {
        // finaliza o carregamento (independente se deu erro ou não)
        setLoading(false);
      }
    }

    carregarPersonagens(); // chama a função ao carregar a página
  }, []);

  return (
    <section>
      {/* se estiver carregando, mostra o texto */}
      {loading ? (
        <p>Carregando...</p>
      ) : (

        // mostra os personagens
        <div className="personagens">
          {data.characters.map((personagem, i) => (
            <div key={i} className="personagem">
              <h3>{personagem.name}</h3>

              {/* imagem do personagem ou imagem padrão se não carregar */}
              <img
                src={personagem.images && personagem.images[0] ? personagem.images[0] : "/placeholder.png"}
                alt={personagem.name}
                onError={(e) => (e.target.src = "/placeholder.png")}
              />

              <p><strong>Id:</strong> {personagem.id}</p>

              {/* exibe a família, se houver */}
              <p>
                <strong>Família:</strong>{" "}
                {personagem.family
                  ? Object.values(personagem.family).join(", ")
                  : "Desconhecida"}
              </p>

              {/* mostra até 5 jutsus e "..." se tiver mais */}
              <p>
                <strong>Jutsus:</strong>{" "}
                {personagem.jutsu && personagem.jutsu.length > 0
                  ? personagem.jutsu.slice(0, 5).join(", ") + (personagem.jutsu.length > 5 ? "..." : "")
                  : "Nenhum"}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
