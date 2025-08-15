using AuthRedux_API.Models;

namespace AuthRedux_API.Services
{
    public class UserService
    {
        private static List<User> users = new();

        public User Register(RegisterDto dto)
        {
            var existing = users.FirstOrDefault(u => u.Username == dto.Username);
            if (existing != null) return null;

            var user = new User
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Username = dto.Username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };
            users.Add(user);
            return user;
        }

        public User ValidateUser(LoginDto dto)
        {
            var user = users.FirstOrDefault(u => u.Username == dto.Username);
            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash)) return null;
            return user;
        }
    }

}
