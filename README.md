# SeeQL

### __TODO:__
[ ] In settings, add checkbox "allow sub-queries"
[ ] In settings, add checkbox "allow combined queries"
	(example: A -> X -> C and B -> X -> D we'll have 4 queries : AXC AXD BXC BXD)
[ ] In settings, add checkbox "allow multiple queries per file"
[ ] Add ASC/DESC to each field of OrderBy Node
[ ] Think to: How to connect a sub-query with an other query
[ ] Think to: Do I really need to create a StartQuery block or can I read queries from the end to the start ? (usefull for sub-queries case)
[ ] In settings, add the possibility to chose the SQL language verson (MySQL...)
[x] Add backwards connection constraints
[x] Remove spellcheck
[ ] Add "using" node
[ ] Own undo/redo
[ ] 

### Nodes connections allowed:
```json
{
  "WITH": {
    "precededBy": [],
    "followedBy": ["SELECT", "INSERT", "UPDATE", "DELETE"]
  },
  "SELECT": {
    "precededBy": ["WITH"],
    "followedBy": ["DISTINCT", "FROM", "WHERE", "GROUP BY", "HAVING", "ORDER BY", "LIMIT"]
  },
  "DISTINCT": {
    "precededBy": ["SELECT"],
    "followedBy": ["COLUMN_LIST", "FROM"]
  },
  "FROM": {
    "precededBy": ["SELECT", "DISTINCT"],
    "followedBy": ["JOIN", "WHERE", "GROUP BY", "HAVING", "ORDER BY", "LIMIT"]
  },
  "JOIN": {
    "precededBy": ["FROM", "JOIN"],
    "followedBy": ["ON", "USING", "JOIN", "WHERE", "GROUP BY", "HAVING", "ORDER BY", "LIMIT"]
  },
  "ON": {
    "precededBy": ["JOIN"],
    "followedBy": ["JOIN", "WHERE", "GROUP BY", "HAVING", "ORDER BY", "LIMIT"]
  },
  "USING": {
    "precededBy": ["JOIN"],
    "followedBy": ["JOIN", "WHERE", "GROUP BY", "HAVING", "ORDER BY", "LIMIT"]
  },
  "WHERE": {
    "precededBy": ["FROM", "JOIN", "ON", "USING"],
    "followedBy": ["GROUP BY", "HAVING", "ORDER BY", "LIMIT"]
  },
  "GROUP BY": {
    "precededBy": ["FROM", "JOIN", "ON", "USING", "WHERE"],
    "followedBy": ["HAVING", "ORDER BY", "LIMIT"]
  },
  "HAVING": {
    "precededBy": ["GROUP BY", "FROM", "JOIN", "ON", "USING", "WHERE"],
    "followedBy": ["ORDER BY", "LIMIT"]
  },
  "ORDER BY": {
    "precededBy": ["SELECT", "FROM", "JOIN", "ON", "USING", "WHERE", "GROUP BY", "HAVING"],
    "followedBy": ["LIMIT"]
  },
  "LIMIT": {
    "precededBy": ["SELECT", "FROM", "JOIN", "ON", "USING", "WHERE", "GROUP BY", "HAVING", "ORDER BY"],
    "followedBy": []
  },
  "INSERT": {
    "precededBy": ["WITH"],
    "followedBy": ["INTO", "VALUES", "SELECT"]
  },
  "INTO": {
    "precededBy": ["INSERT"],
    "followedBy": ["TABLE_NAME", "COLUMN_LIST", "VALUES", "SELECT"]
  },
  "VALUES": {
    "precededBy": ["INTO"],
    "followedBy": []
  },
  "UPDATE": {
    "precededBy": ["WITH"],
    "followedBy": ["TABLE_NAME", "SET"]
  },
  "SET": {
    "precededBy": ["UPDATE"],
    "followedBy": ["WHERE"]
  },
  "DELETE": {
    "precededBy": ["WITH"],
    "followedBy": ["FROM", "WHERE"]
  }
}
```
