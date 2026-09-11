import { useEffect, useState } from "react";
import { PersonHttpRepository } from "@/infra/repositories/person-http-repository";

export function usePersonDetail(personId?: string | null) {
  const [person, setPerson] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!personId) {
      setIsLoading(false);
      return;
    }

    const repository = new PersonHttpRepository();
    
    repository
      .findById(personId)
      .then(setPerson)
      .catch((err) => setError(err.message || "Perfil não encontrado."))
      .finally(() => setIsLoading(false));
  }, [personId]);

  return { person, isLoading, error };
}