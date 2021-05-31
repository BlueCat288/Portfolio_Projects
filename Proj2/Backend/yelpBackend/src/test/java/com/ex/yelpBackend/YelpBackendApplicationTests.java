package com.ex.yelpBackend;
import com.ex.yelpBackend.model.Bookmark;
import com.ex.yelpBackend.model.Location;
import com.ex.yelpBackend.model.User;
import org.junit.BeforeClass;
import org.junit.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.SpringApplication;

@SpringBootTest
public class YelpBackendApplicationTests {
	static User user;
	static Location location;
	static Bookmark bookmark;

	@BeforeClass
	public static void Start() {
		user = new User();
		location = new Location();
		bookmark = new Bookmark();
	}

	@Test
	public void contextLoads() {

	}

	/**
	 * just testing main
	 */
	@Test
	public void testMain() {
		String[] args = new String[] {"arg1", "arg2", "arg3"};
//        SpringApplication.run(YelpBackendApplication.class, args);
		YelpBackendApplication.main(args);
	}

	@Test
	public void testPojo() {
		user = new User();
		location = new Location();
		bookmark = new Bookmark();

		user.toString();
		location.toString();
		bookmark.toString();

		user = new User("1", "e", "e", "e");
		location = new Location("e", "e");
		bookmark = new Bookmark("e", "e", "e", "e", "e", "e", location);
	}



}
