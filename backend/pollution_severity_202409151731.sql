-- bluevisionary.pollution_severity definition

CREATE TABLE `pollution_severity` (
  `state` varchar(50) DEFAULT NULL,
  `state_name` varchar(50) DEFAULT NULL,
  `polymer_count` int DEFAULT NULL,
  `marine_area_kmsqaure` int DEFAULT NULL,
  `law_count` int DEFAULT NULL,
  `severity_count_per_km_sq` double DEFAULT NULL,
  `score` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO bluevisionary.pollution_severity (state,state_name,polymer_count,marine_area_kmsqaure,law_count,severity_count_per_km_sq,score) VALUES
	 ('NSW','New South Wales',759,8802,2,0.0862304022,45),
	 ('NT','Northern Territory',35,71839,3,0.0004872005,0),
	 ('QLD','Queensland',545,121994,1,0.0044674328,0),
	 ('SA','South Australia',418,60032,1,0.0069629531,0),
	 ('TAS','Tasmania',36,22357,4,0.0016102339,0),
	 ('VIC','Victoria',65,10213,1,0.0063644375,0),
	 ('WA','Western Australia',270,115740,3,0.0023328149,0);
