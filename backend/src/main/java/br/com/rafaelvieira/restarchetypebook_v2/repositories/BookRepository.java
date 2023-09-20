package br.com.rafaelvieira.restarchetypebook_v2.repositories;

import br.com.rafaelvieira.restarchetypebook_v2.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {}
